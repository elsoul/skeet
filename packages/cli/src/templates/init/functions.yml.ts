import { SKEET_CONFIG } from '@/config/config'
import { convertToKebabCase, toCamelCase } from '@/utils/string'
import { mkdirSync } from 'fs'

export const functionsYml = (functionName: string) => {
  mkdirSync('.github/workflows', { recursive: true })
  const nodeVersion = SKEET_CONFIG.NODE_VERSION
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
    name: Deploy
    runs-on: ubuntu-22.04
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
          node-version: '${nodeVersion}'
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
      - id: auth
        uses: google-github-actions/auth@v2
        with:
          credentials_json: \${{ secrets.SKEET_GCP_SA_KEY }}
      - name: Install firebase tools
        run: pnpm i -g firebase-tools
      - name: GitHub repository setting
        run: git config --global url."https://github.com".insteadOf ssh://git@github.com
      - name: Install dependencies
        run: pnpm -F ${functionName}-func install --frozen-lockfile
      - name: Build App
        run: pnpm -F ${functionName}-func  build
      - name: Deploy to Firebase
        run: firebase deploy --only functions:${functionName}
`
  return {
    filePath,
    body,
  }
}
