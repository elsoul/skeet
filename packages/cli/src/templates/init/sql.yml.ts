import { SKEET_CONFIG } from '@/config/config'
import { getContainerRegion } from '@/lib'
import { toCamelCase } from '@skeet-framework/utils'
import { mkdirSync } from 'fs'

const NODE_VERSION = SKEET_CONFIG.NODE_VERSION

export const sqlYml = (
  instanceName: string,
  memory: string,
  cpu: string,
  maxConcurrency: string,
  maxInstances: string,
  minInstances: string,
  envString: string,
  region: string,
) => {
  const cRegion = getContainerRegion(region).split('.')[0]
  const sqlDir = instanceName.split('-')[1] + '-db'
  const cloudRunName = instanceName.replaceAll('-', '')
  const cameledInstanceName = toCamelCase(instanceName)
  mkdirSync('.github/workflows', { recursive: true })
  const filePath = `.github/workflows/${instanceName}.yml`
  const body = `name: ${cameledInstanceName}
on:
  push:
    branches:
      - main
    paths:
      - 'sql/${sqlDir}/**'
      - '.github/workflows/${instanceName}.yml'

jobs:
  build:
    runs-on: ubuntu-22.04

    services:
      db:
        image: postgres:15
        ports: ['5432:5432']
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Checkout Repository
        uses: actions/checkout@v3
      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '${NODE_VERSION}'
      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: \${{ env.STORE_PATH }}
          key: \${{ runner.os }}-pnpm-store-\${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            \${{ runner.os }}-pnpm-store-

      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2
        with:
          credentials_json: \${{ secrets.SKEET_GCP_SA_KEY }}

      - name: Build and test
        env:
          PGHOST: 127.0.0.1
          PGUSER: postgres
          RACK_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@127.0.0.1:5432/skeet-sql-test?schema=public
        run: |
          sudo apt-get -yqq install libpq-dev
          cd sql/${sqlDir}
          rm -f .env
          pnpm install
          npx prisma generate
          npx prisma migrate dev --skip-seed

      - name: Configure Docker
        run: gcloud auth configure-docker ${cRegion}-docker.pkg.dev --quiet

      - name: Build Docker container
        run: docker build -f ./sql/${sqlDir}/Dockerfile ./sql/${sqlDir} -t ${instanceName}

      - name: Tag Docker container
        run: docker tag ${instanceName} ${cRegion}-docker.pkg.dev/\${{ secrets.SKEET_GCP_PROJECT_ID }}/\${{ secrets.SKEET_CONTAINER_REGION }}/${instanceName}

      - name: Push to Artifact Resistory
        run: docker push ${cRegion}-docker.pkg.dev/\${{ secrets.SKEET_GCP_PROJECT_ID }}/\${{ secrets.SKEET_CONTAINER_REGION }}/${instanceName}

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${cloudRunName} \\
            --service-account=\${{ secrets.SKEET_APP_NAME }}@\${{ secrets.SKEET_GCP_PROJECT_ID }}.iam.gserviceaccount.com \\
            --image=${cRegion}-docker.pkg.dev/\${{ secrets.SKEET_GCP_PROJECT_ID }}/\${{ secrets.SKEET_CONTAINER_REGION }}/${instanceName} \\
            --memory=${memory} \\
            --cpu=${cpu} \\
            --concurrency=${maxConcurrency} \\
            --max-instances=${maxInstances} \\
            --min-instances=${minInstances} \\
            --region=\${{ secrets.SKEET_GCP_REGION }} \\
            --ingress=internal-and-cloud-load-balancing \\
            --platform=managed \\
            --quiet \\
            --port=8080 \\
            --vpc-connector="\${{ secrets.SKEET_APP_NAME }}-con" \\
            --vpc-egress=all \\
            --set-env-vars=${envString}
`

  return {
    filePath,
    body,
  }
}
