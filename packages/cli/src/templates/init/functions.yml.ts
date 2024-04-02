import { SKEET_CONFIG } from '@/config/config'
import { convertToKebabCase, toCamelCase } from '@/utils/string'
import { mkdir } from 'fs/promises'

export const functionsYml = async (functionName: string) => {
  await mkdir('.github/workflows', { recursive: true })
  const name = toCamelCase(functionName) + 'Func'
  const kebabName = convertToKebabCase(functionName)
  const ymlName = `${kebabName}-func.yml`
  const filePath = `.github/workflows/${ymlName}`
  const body = `name: ${name}
on:
  push:
    branches:
      - main
    paths:
      - 'functions/${kebabName}/**'
      - '.github/workflows/${ymlName}'

jobs:
  deploy:
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        node-version: [20]

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'pnpm'

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          credentials_json: \${{ secrets.SKEET_GCP_SA_KEY }}
      - name: Install firebase tools
        run: pnpm add -g firebase-tools
      - name: GitHub repository setting
        run: git config --global url."https://github.com".insteadOf ssh://git@github.com
      - name: Install dependencies
        run: pnpm -F ${functionName}-func install --frozen-lockfile
      - name: Build App
        run: pnpm -F ${functionName}-func build
      - name: Deploy to Firebase
        run: firebase deploy --only functions:${functionName}
`
  return {
    filePath,
    body,
  }
}
