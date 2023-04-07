import fs from 'fs'

export const apiYml = async (
  envString: string,
  memory: string,
  cpu: string,
  maxConcurrency: string,
  maxInstances: string,
  minInstances: string
) => {
  fs.mkdirSync('.github/workflows', { recursive: true })
  const filePath = `.github/workflows/api.yml`
  const body = `name: Api
on:
  push:
    branches:
      - main
    paths:
      - 'apps/api/**'
      - '.github/workflows/api.yml'

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Install Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18.14.0'

      - name: Checkout the repository
        uses: actions/checkout@v2

      - id: auth
        uses: google-github-actions/auth@v0
        with:
          credentials_json: \${{ secrets.KINPACHI_GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v0


  return {
    filePath,
    body,
  }
}`
}
