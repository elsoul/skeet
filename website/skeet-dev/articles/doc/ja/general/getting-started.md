---
id: general-getting-started
title: Getting Started
description: Skeet - TypeScript Serverless Framework. The Complete Web Framework for Modern Developers.
---

![Skeet](https://storage.skeet.dev/ogp.jpg)

## The Complete Web Framework for Modern Developers

Skeet v3では、サーバーレスアーキテクチャの課題であるコールドスタートを排除するとともに、エッジランタイムのサポートを導入しました。これにより、Edge-Native なアーキテクチャへと変貌し、現代のウェブに最適化されています。

🚧 現在、Skeet開発チームはv3の開発に注力しており、活発な開発が進行中です。

最新情報については、公式Discordコミュニティに参加してください：

https://discord.gg/H2HeqRq54J

Firebase上で動作するバージョン（v1、v2）のドキュメントについては、以下のリンクをご参照ください：

Skeet v1 ドキュメント: https://skeet.dev/ja/v1doc/general/overall-architecture

Skeet v2 ドキュメント: https://skeet.dev/ja/v2doc/general/overall-architecture

## RC

Skeet v3 Edge Runtime Next.js: https://github.com/elsoul/skeet-v3-next-edge-rc

Skeet v3 SSG Next.js: https://github.com/elsoul/skeet-v3-next-ssg-rc

Skeet v3 Solana dApp: https://github.com/elsoul/skeet-v3-solana-dapp-rc

## We go with Deno.

![We go with Deno](https://storage.skeet.dev/WeGoWithDeno.jpg)

「Uncomplicate JavaScript」を掲げるDenoは、開発者にシンプルでありながら高性能な開発環境を提供します。セットアップの簡便さはもちろん、新しいDenoはWebサーバーとしての処理性能も従来のNode.jsの約2倍に達し、より快適で高速な開発体験を実現しています。この性能向上は、Node.jsの豊富な知見に基づき、最新のV8エンジンとRustの技術を活用してTypeScriptネイティブのランタイムを再構築することで達成されました。Denoは実際のJavaScriptユースケースを考慮して設計され、Web標準にも準拠しており、4年にわたる標準ライブラリの開発により、安定した開発環境を支えています。

![Why Deno](https://storage.skeet.dev/WhyDeno.jpg)

Skeet開発チームの初期検証でも、pnpmプロジェクトを単にDenoに移行するだけで、開発サーバーの立ち上げ速度や動作速度が向上し、CI/CDの処理も高速化され、ビルド時間が大幅に短縮されることが確認されました。

DenoはTypeScriptをネイティブでサポートしており、LinterやFormatter、テストツールといったモダンな開発に不可欠なツールが標準で備わっており、ゼロコンフィグで即座に利用できます。従来のNode.jsプロジェクトでは、開発に必要なTypeScriptやLinter、Formatterやテストツールを導入するだけでも複数のモジュールや細かな設定が必要で、初期設定や依存関係の増加によってnode_modulesが肥大化し、プロジェクトが複雑化することもありました。これにより開発速度の低下が懸念されることも少なくありませんでした。

![Deno Performance](https://storage.skeet.dev/DenoPerformance.jpg)

Denoはこれらの課題に一つ一つ対応し、開発者が本来のコーディングに集中できる理想的な環境を提供しています。詳しくは、以下のDeno v2.0の公式ブログをご覧ください。

Deno v2.0: https://deno.com/blog/v2.0

## Feel the True Deno Experience

![Skeet Deno Fresh](https://storage.skeet.dev/ogpFresh.jpg)

Denoでは、従来のnpmプロジェクトも問題なく動作しますが、Denoの真価を発揮し、Edge-Nativeのさらなるパフォーマンスを引き出すには、Denoネイティブのモジュール構成が不可欠です。現状、Next.jsはnpm、特に`package.json`や`tsconfig` (React Compiler等) への依存が強く、Denoネイティブの構成を実現することが難しくなっています。

そこで、Next.jsのApp Routingと同様の開発体験を提供するDeno製フロントエンドフレームワーク「Fresh」が登場しました。

Deno Fresh: https://fresh.deno.dev/

Next.jsの開発環境では立ち上がりに数秒（これは過去と比較して大幅に速くなったものの）時間を要しますが、Freshではコマンドを実行した瞬間に開発サーバーが立ち上がり、すぐにReadyの状態になります。この速さは、フロントエンド開発者にとって新たな発見となるはずです。まるでWeb APIサーバーの「Hello World」を実行するような軽快さで、開発環境が即座にスタートできる体験を提供します。

Next.jsベースのものとFreshベースのものをぜひ比較してみてください。以下のリポジトリから試していただければ、その違いを実感できると思います。

Skeet v3 Edge Deno Fresh: https://github.com/elsoul/skeet-v3-fresh-edge-web-rc

こうした大幅な改善を、これまでと変わらず直感的でわかりやすい形でお届けできるよう、Skeet v3の開発を日々続けています。現在の注力は主に開発ツールチェーン、そしてDenoネイティブのWeb3開発環境(主にSolana)です。

皆様からのフィードバックも大歓迎ですので、ぜひ私たちのDiscordサーバーにもご参加ください。

公式 Discord: https://discord.gg/H2HeqRq54J
