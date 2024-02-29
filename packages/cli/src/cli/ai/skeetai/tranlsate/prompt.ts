export const markdownTranslatePrompt = (langFrom = 'ja', langTo = 'en') => {
  return {
    context: `以下のようなマークダウン形式のドキュメントを ${langFrom} 語(ISO 639‑1) から ${langTo} 語(ISO 639‑1) へ翻訳して下さい。
翻訳前の文章の言語： ${langFrom}
翻訳後の文章の言語： ${langTo}
必須条件： # の数は変更せずに、翻訳して下さい。マークダウン形式では # は見出しを表します。# の数が変わると見出しのレベルが変わってしまいます。
必須条件2: \` バックスラッシュの数は変更せずに、翻訳して下さい。マークダウン形式では \` はコードブロックを表します。バックスラッシュの数が変わるとコードブロックの中身が変わってしまいます。
追加条件： 改善できる文章があれば改善して下さい。
出力形式： マークダウン形式のドキュメント`,
    examples: [
      {
        input: `## Skeet CLI のインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。

\`\`\`bash
$ npm i -g @skeet-framework/cli
\`\`\``,
        output: `# Installing Skeet CLI

Skeet CLI is a command line tool for efficiently using the Skeet framework. You can install it with the following command.
\`\`\`bash
$ npm i -g @skeet-framework/cli
\`\`\``,
      },
      {
        input: `# 特徴

すべての CRUD 操作は Firestore コンバーターをサポートします。
createdAt および updatedAt は Firebase ServerTimestamp で自動的にドキュメントに追加されます。

- [x] コレクションアイテムの追加
- [x] 複数のコレクションアイテムの追加
- [x] コレクションアイテムの取得
- [x] コレクションアイテムのクエリ
- [x] コレクションアイテムの更新
- [x] コレクションアイテムの削除`,
        output: `## Features
All CRUD operations are supported with Firestore converters. The createdAt and updatedAt fields are automatically added to documents using Firebase ServerTimestamp.

- [x] Adding collection items
- [x] Adding multiple collection items
- [x] Retrieving collection items
- [x] Querying collection items
- [x] Updating collection items
- [x] Deleting collection items`,
      },
    ],
  }
}

export const jsonTranslatePrompt = (langFrom = 'ja', langTo = 'en') => {
  return {
    context: `これから JSON形式のファイルが 20行ごとに区切られた形の文字列が送られてきます。形式は決して崩さずに、JSONの value にあたる部分を ${langFrom} 語(ISO 639‑1) から ${langTo} 語(ISO 639‑1) へ翻訳して下さい。改行はそのままにして下さい。valueの値以外は絶対に変えないで下さい。
翻訳前の文章の言語(ISO 639‑1)： ${langFrom}
翻訳後の文章の言語(ISO 639‑1)： ${langTo}
必須条件： JSONの構造は変更せずに、翻訳して下さい。JSON形式では構造が変わるとプログラムにエラーが発生します。
必須条件2: JSONの key にあたる名前は翻訳しないでください。JSON形式では key が変わるとプログラムにエラーが発生します。value にあたる値は必ず翻訳してください。
追加条件： 改善できる文章があれば改善して下さい。
出力形式： JSON形式のファイル`,
    examples: [
      {
        input: `{
  "title": "Skeet ドキュメント",
  "body1": "GCP (Google Cloud) と Firebase上にフルスタックアプリ",
  "body2": "を構築できるオープンソースのサーバーレスフレームワーク",
  "previousPage": "前のページ",
  "nextPage": "次のページ",
  "actions": {
    "motivation": {
      "title": "モチベーション",
      "body": "Skeet は素早くアプリを立ち上げ、少ないコストで長期的にメンテナンスしていくことを可能にします。"
    },
    "quickstart": {
      "title": "クイックスタート",
      "body": "Skeet フレームワークを使い始めるための設定について説明します。"
    },
    "setup": {
      "title": "セットアップ",
      "body": "Skeet フレームワークを使い始めるための設定について説明します。"
    },
    "tutorial": {
`,
        output: `{
  "title": "Skeet Document",
  "body1": "Open-Source Serverless App Framework for full-stack apps",
  "body2": "on GCP (Google Cloud) and Firebase.",
  "previousPage": "Previous page",
  "nextPage": "Next page",
  "actions": {
    "motivation": {
      "title": "Motivation",
      "body": "Skeet allows you to get your app up and running quickly and maintain it for the long term at a low cost."
    },
    "quickstart": {
      "title": "Quickstart",
      "body": "Describes the setup for getting started with the Skeet framework."
    },
    "setup": {
      "title": "Setup",
      "body": "Describes the setup for getting started with the Skeet framework."
    },
    "tutorial": {
`,
      },
      {
        input: `      "title": "チュートリアル",
        "body": "Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。"
      },
      "initial-deploy": {
        "title": "最初のデプロイ",
        "body": "Skeet アプリを公開する方法について説明します。GitHub ActionsによるCommit毎のデプロイもワンコマンドで設定できます。"
      },
      "basic-architecture": {
        "title": "基本アーキテクチャ",
        "body": "Skeetフレームワークの基本構造について説明します。アプリの各ディレクトリやCLIの各コマンドを解説しています。"
      },
      "skeet-firestore": {
        "title": "Skeet Firestore",
        "body": "Skeet フレームワーク における型安全な Firestore の使い方を解説します。"
      },
      "nextjs-template": {
        "title": "Next.js (React)",
        "body": "Next.js (React) のボイラープレート。TypeScript、SEO対応、多言語対応、SSG、PWAなどWeb開発に必要な設定は完了しています。"
      },
      "expo-template": {
`,
        output: `      "title": "Tutorial",
        "body": "This tutorial will create an Chat App using Skeet Framework."
      },
      "initial-deploy": {
        "title": "Initial Deploy",
        "body": "You can learn how to publish your Skeet app. You can also set deploy for each Commit with GitHub Actions with a single command."
      },
      "basic-architecture": {
        "title": "Basic Architecture",
        "body": "Describes the basic structure of the Skeet framework. Each directory of the application and each command of CLI are explained."
      },
      "skeet-firestore": {
        "title": "Firestore Plugin",
        "body": "How to use type-safe Firestore in Skeet Framework."
      },
      "nextjs-template": {
        "title": "Next.js Template (React)",
        "body": "The settings necessary for web development, such as TypeScript, SEO support, multilingual support, SSG, PWA, etc., have been completed."
      },
      "expo-template": {
`,
      },
      {
        input: `        "title": "Expo (React Native)",
      "body": "Expo (React Native)のボイラープレート。モバイル開発(ios,Android)においてもTailwindなどnpm、Reactの資産を活かせます。"
    },
    "skeet-cli": {
      "title": "Skeet CLI",
      "body": "Skeet CLI は Skeet フレームワーク を使用しているプロジェクトを作成するためのコマンドラインツールです。"
    }
  },
  "menuNav": {
    "home": "ドキュメント ホーム",
    "general": {
      "groupTitle": "全般",
      "motivation": "モチベーション"
    },
    "skeet-graphql": {
      "groupTitle": "GraphQL バックエンド",
      "quickstart": "クイックスタート",
      "setup": "セットアップ",
      "basic-architecture": "基本アーキテクチャ",
      "initial-deploy": "最初のデプロイ",
      "tutorial": "チュートリアル",
`,
        output: `        "title": "Expo (React Native)",
      "body": "Expo (React Native) on the frontend. We can use npm packages like the Tailwind on mobile dev as well."
    }
  },
  "menuNav": {
    "home": "Docs Home",
    "general": {
      "groupTitle": "General",
      "motivation": "Motivation"
    },
    "skeet-graphql": {
      "groupTitle": "GraphQL Backend",
      "quickstart": "Quickstart",
      "setup": "Setup",
      "basic-architecture": "Basic Architecture",
      "initial-deploy": "Initial Deploy",
      "tutorial": "Tutorial",
`,
      },
    ],
  }
}
