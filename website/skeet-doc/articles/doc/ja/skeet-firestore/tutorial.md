---
id: tutorial
title: チュートリアル - Firestore
description: Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。
---

## チュートリアル - Firestore

このチュートリアルでは 定期的に AI に記事を評価させてディスコードに通知するアプリを作成します。
プログラミング言語 TypeScript と Firebase Firestore を含めた総合的なクラウドアプリの開発チュートリアルです。

クイックスタートでは Skeet Framework の基本的な使い方を学びましたが、
このチュートリアルでは skeet CLI の機能を使ってこれまでには簡単にできなかったことが、
どのように簡単にできるようになるかを学びます。
オープンソースとしてライブラリーを公開して下さっている開発者の方々には多大なる感謝を申し上げます。

Skeet Framework は、コンピューターリソースを効率的に使うことで、
開発者がより少ないコードでより多くのことを実現できるように設計されています。
さらに、昨今の地球では環境問題が深刻化しており、エネルギーを効率的に使うことは、
開発者の責務であると考えています。

このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

この章では クイックスタートで作成したプロジェクトに新しい機能を追加していきます。

## チュートリアルの目標

このチュートリアルでは、以下のことを学びます。

- _skeet add method_ コマンドを使ってエンドポイントを追加する
- _skeet sync routings_ コマンドを使ってルーティングを同期する
- _skeet add method_ コマンドを使ってスケジュールを追加する
- _skeet add tq_ コマンドを使って Cloud Tasks キューを追加する
- _skeet sync tq_ コマンドを使って Cloud Tasks を同期する
- Firebase へデプロイする

## チュートリアルの前提条件

[セットアップ](/ja/doc/skeet-firestore/setup) が完了していない場合は先に完了させてください。

## 開発環境

Skeet Framework では エディタに VScode を推奨しています。
フレームワークに沿って開発を進めることで、
GitHub Copilot 及び OpenAI を使った強力なコード補完サポートを受けることができます。

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

Chatbot には OpenAI の API を使います。

- [OpenAI](https://openai.com/)

## ルーティングの追加・同期

エンドポイントを追加した場合には、デプロイ後にルーティングの同期を行う必要があります。
これにより、ロードバランサーの設定が更新されます。

```bash
$ skeet sync routings
```

このコマンドにより、

- ネットワークエンドポイントグループの作成
- バックエンドサービスの作成
- バックエンドサービスの追加
- セキュリティーポリシーの適用
- URL マップの作成

を自動で行っています。

## Cloud Armor の追加・同期

_skeet-cloud.config.json_ に記述されている Cloud Armor の設定を同期します。

_skeet-cloud.config.json_

```json
{
  ...
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "x.x.x.x",
            "action": "allow"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

この設定では _src-ip-ranges_ に指定した IP アドレスからのアクセスを許可し、
それ以外のアクセスは _deny-403_ で拒否しています。

```bash
$ skeet sync armors
```

新規に Google Cloud Armor を作成または、更新されます。
