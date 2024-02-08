import { SKEET_CONFIG } from '@/config/config'
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
) => {
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
      - 'sql/${sqlDir}'
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
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '${NODE_VERSION}'

      - name: Checkout the repository
        uses: actions/checkout@v2

      - id: auth
        uses: google-github-actions/auth@v0
        with:
          credentials_json: \${{ secrets.SKEET_GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v0

      - name: Build and test
        env:
          PGHOST: 127.0.0.1
          PGUSER: postgres
          RACK_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@127.0.0.1:5432/skeet-graphql-test?schema=public
        run: |
          sudo apt-get -yqq install libpq-dev
          cd graphql
          rm -f .env
          yarn install --jobs 4 --retry 3
          npx prisma generate
          npx prisma migrate dev --skip-seed
          yarn test

      - name: Configure Docker
        run: gcloud auth configure-docker --quiet

      - name: Build Docker container
        run: docker build -f ./sql/${sqlDir}/Dockerfile ./sql/${sqlDir} -t \${{ secrets.SKEET_CONTAINER_REGION }}/\${{ secrets.SKEET_GCP_PROJECT_ID }}/${instanceName}

      - name: Push to Container Resistory
        run: docker push \${{ secrets.SKEET_CONTAINER_REGION }}/\${{ secrets.SKEET_GCP_PROJECT_ID }}/${instanceName}

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${cloudRunName} \\
            --service-account=\${{ secrets.SKEET_APP_NAME }}@\${{ secrets.SKEET_GCP_PROJECT_ID }}.iam.gserviceaccount.com \\
            --image=\${{ secrets.SKEET_CONTAINER_REGION }}/\${{ secrets.SKEET_GCP_PROJECT_ID }}/${instanceName} \\
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
