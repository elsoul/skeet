---
id: solana-firestore-template
title: Solana Mobile Stack (Expo) + Web (Next.js) - Firestore Template
description: Skeet Framework App Template with Solana Mobile Stack (Expo) + Web (Next.js) - Firestore
---

![Skeet Solana Mobile Stack](https://storage.googleapis.com/skeet-assets/animation/SkeetSolanaMobileStack.gif)

## Skeet Solana Mobile Stack (Expo) + Web (Next.js) - Firestore Template

Expo (React Native) + Firestore App Environment for Skeet Framework

[GitHub - Skeet Solana Mobile Stack (Expo) + Web (Next.js) - Firestore Template](https://github.com/elsoul/skeet-solana-mobile-stack)

Solana Mobile Stack: https://docs.solanamobile.com/

- [Firebase - Serverless Platform](https://firebase.google.com/)
- [Google Cloud - Cloud Platform](https://cloud.google.com/)
- [Jest - Testing framework](https://jestjs.io/)
- [TypeScript - Type Check](https://www.typescriptlang.org/)
- [ESLint - Linter](https://eslint.org/)
- [Prettier - Formatter](https://prettier.io/)
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Recoil - State Management](https://recoiljs.org/)
- [React i18n - Localization](https://react.i18next.com/)
- [twrnc - TailwindCSS](https://github.com/jaredh159/tailwind-react-native-classnames)
- [React Navigation - Routing](https://reactnavigation.org/)
- [Solana - The fastest L1 Blockchain](https://solana.com/)
- [Solana Web3.js - Solana JavaScript API](https://github.com/solana-labs/solana-web3.js)
- [Solana Mobile Wallet Adapter](https://docs.solanamobile.com/react-native/overview)
- [Next.js - SSG Framework](https://nextjs.org/)
- [React - UI Framework](https://reactjs.org/)
- [Tailwind - CSS Framework](https://tailwindcss.com/)
- [Solana Wallet Adapter (Web)](https://github.com/solana-labs/wallet-adapter)

## Setup

Solana Mobile Stack - Development Setup: https://docs.solanamobile.com/getting-started/development-setup

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)

## Usage

※ANDROID_HOME environment is important. Please do not forget to put your ANDROID SDK PATH to eas.json and package.json
(It will be like /Users/ktm/Library/Android/sdk)

```bash
$ npm i -g firebase-tools
$ npm i -g @skeet-framework/cli
```

```bash
$ skeet create <project-name>
$ cd <project-name>
$ skeet s
```

If you setup the Android Emulator, the mobile app will be launched automatically.

Web-Frontend: http://localhost:4200

Firebase Emulator: http://localhost:4000

**※ You need OpenAI API key to use ChatGPT.**

_./functions/skeet/.secret.local_
or
_./functions/skeet/.env_

```bash
CHAT_GPT_KEY=your-key
CHAT_GPT_ORG=your-org
```

Test your app:

```bash
$ skeet test
```
