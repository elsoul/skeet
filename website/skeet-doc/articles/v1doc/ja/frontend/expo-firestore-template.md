---
id: expo-firestore-template
title: Expo (React Native) + Firestore テンプレート
description: Skeet フレームワークのアプリテンプレート。Expo (React Native) と Firestore を使用しています。
---

![Skeet Expo Template](https://storage.googleapis.com/skeet-assets/imgs/samples/skeet-app-template.png)

## Skeet App Expo (React Native) + Firestore テンプレート

Expo (React Native) + Firestore App Environment for Skeet Framework

[GitHub - Skeet App Expo + Firestore Template](https://github.com/elsoul/skeet-app)

## 心がけ

- 迅速な開発
- ハイパフォーマンス
- グローバルスケール(多言語化含む)
- メンテナンスしやすいコードベース
- マルチプラットフォーム(iOS,Android,Web)

## Summary

- [x] [React Native](https://reactnative.dev/)
- [x] [Expo](https://docs.expo.dev/)
- [x] [EAS Build](https://docs.expo.dev/build/introduction/)
- [x] [TypeScript - Type Check](https://www.typescriptlang.org/)
- [x] [ESLint - Linter](https://eslint.org/)
- [x] [Prettier - Formatter](https://prettier.io/)
- [x] [Recoil - State Management](https://recoiljs.org/)
- [x] [React i18n - Localization](https://react.i18next.com/)
- [x] [twrnc - TailwindCSS](https://github.com/jaredh159/tailwind-react-native-classnames)
- [x] [React Navigation - Routing](https://reactnavigation.org/)
- [x] [Firebase](https://firebase.google.com/)

## Usage

```bash
$ npm i -g firebase-tools
$ npm i -g @skeet-framework/cli
```

```bash
$ skeet create <project-name>
```

```bash
$ cd <project-name>
$ skeet s
```

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

Open Firebase Emulator: http://localhost:4000

Open Front-end App: http://localhost:19006

## EAS Build

[EAS Build](https://docs.expo.dev/build/introduction/)

You need to run this command to setup EAS Build project.
(Edit app.json for example changing names and deleting "extra" to build new project.)

```
yarn build:configure
```
