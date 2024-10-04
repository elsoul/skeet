---
id: publish-skeet-architecture
title: オープンソースのアプリ開発ツールSkeetのサーバーレスアーキテクチャ図を公開
category: プレスリリース
thumbnail: /news/2023/11/07/SkeetArchitecture.png
---

ELSOUL LABO B.V. (エルソウルラボ、本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武)は、オープンソースのアプリ開発ツール Skeet のサーバーレスアーキテクチャ図を公開しました。

オープンソースの開発ツール市場に新たな革命をもたらす Skeet は、TypeScript で構築された最先端のサーバーレスアプリ開発フレームワークです。開発者が直面する様々な課題に柔軟に対応し、煩雑なインフラ管理から解放します。

Skeet - 全体アーキテクチャ: https://skeet.dev/ja/doc/general/overall-architecture/

■ 製品の概要

Skeet は、必要な機能を自由に選択し、プロジェクトに即座に適用することができる柔軟性を備えています。Firebase Functions で Stripe や Discord API といった WebAPI を利用することで、フロントエンドの開発を省略し、機能開発に集中することも可能です。さらに、BigQuery を用いたデータ分析や、ブロックチェーンウォレットに対応した Web3 アプリの開発まで、モダンなアプリ開発を包括的に支援します。

■ 開発者の利点

Skeet CLI は、開発者がアプリケーション開発に専念できるよう、クラウドアーキテクチャの構築を完全サポートします。生成 AI (LLM)を活用しており、翻訳ファイルの生成、Prisma スキーマのサポート、Firebase Functions のルーティングを含む、多言語対応やドキュメント生成などの強力な機能を提供します。

■ オートスケーリングとコスト管理

オートスケーリング機能により、予測が難しい負荷変動にも自動で対応。複雑なインフラの設計・開発コストとリソースの確保から開放されます。従量課金制で、使用したリソース分のみの課金が可能でプロジェクトを始めやすくなっています。

■ CI/CD とセキュリティ

GitHub Actions のネイティブ対応により、CI/CD 環境のセットアップが容易になります。また、ロードバランサーの設定や Cloud Armor を利用したセキュリティ強化機能も搭載しています。

## Google Cloud、Firebase 上でサーバーレスアプリを爆速開発できるオープンソースの Skeet フレームワーク

![Skeet Serverless Framework](/news/2023/10/28/SkeetJA.png)

Skeet は GCP (Google Cloud) と Firebase 上にフルスタックアプリを構築できるオープンソースの TypeScript 製サーバーレスフレームワークです。

Skeet を使えば、API サーバーから Web・iOS・Android アプリまですべてを TypeScript で爆速開発することができます。TypeScript は静的型付けを提供し、エラーを早期に検出し、コードの品質とメンテナンス性を向上させます。さらに、Skeet は GraphQL や Firestore などのモダンな技術を積極的に採用し、開発者に優れた開発体験を提供します。ChatGPT や Vertex AI などの AI を活用したアプリケーション開発や Solana などのブロックチェーンを活用した Web3 dApp 開発も簡単に行うことができる現代的なアプリケーションフレームワークとなっています。

下記リンクからデモをお試しいただけます。PaLM2・Vertex AI、そして Open AI 社の ChatGPT (GPT-3.5, GPT-4)も同時にお試しいただくことができますので、どちらがどのような特徴を持っているか比較検討していただくことができます。

Skeet デモ: https://skeeter.dev/ja/

また、こちらのデモのアプリは Skeet CLI を使えば 5 分でご自身の PC 環境やクラウド環境で動かすことが可能です。

まずはどのようなことができるかデモでイメージしていただき、その後は Skeet CLI を使ってすぐにアプリ開発をスタートできます。Skeet CLI にも AI が搭載されており、チャットによるコード生成等の強力なサポートにより、開発者の生産性を大幅に向上させます。

Skeet CLI (GitHub): https://github.com/elsoul/skeet-cli

Skeet は世界中すべてのアプリケーション開発現場の開発・メンテナンスコストを削減、開発者体験を向上させるためにオープンソースとして開発されています。

詳しくは公式ドキュメントを御覧ください。

Skeet ドキュメント: https://skeet.dev/ja/
