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
    env:
      PGHOST: 127.0.0.1
      PGUSER: postgres
      RACK_ENV: test
      DATABASE_URL: postgresql://postgres:postgres@127.0.0.1:5432/skeet-sql-test?schema=public
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
      - uses: actions/setup-node@v3
        with:
          node-version: '${NODE_VERSION}'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm -F ${sqlDir} install
      - name: Generate Prisma client
        run: pnpm -F ${sqlDir} db:generate
      - name: Apply migrations
        run: pnpm -F ${sqlDir} db:dev
      - name: Execute tests
        run: pnpm -F ${sqlDir} test
      - name: Authenticate with Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: \${{ secrets.SKEET_GCP_SA_KEY }}
      - name: Configure Docker
        run: gcloud auth configure-docker ${cRegion}-docker.pkg.dev --quiet
      - name: Build and Push Docker container
        uses: docker/build-push-action@v2
        with:
          context: ./sql/${sqlDir}
          file: ./sql/${sqlDir}/Dockerfile
          push: true
          tags: ${cRegion}-docker.pkg.dev/\${{ secrets.SKEET_GCP_PROJECT_ID }}/\${{ secrets.SKEET_CONTAINER_REGION }}/${instanceName}

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
            --allow-unauthenticated \\
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
