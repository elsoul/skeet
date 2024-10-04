---
id: skeet-upgrades-to-nextjs-v14
title: フルスタックサーバーレスフレームワーク「Skeet」が Next.js v14 にアップグレード
category: プレスリリース
thumbnail: /news/2023/10/28/SkeetNextjs14.png
---

ELSOUL LABO B.V.（代表取締役社長：川崎 文武、本社：オランダ・アムステルダム、以下「エルソウルラボ」） は、オープンソースのフルスタックサーバーレスアプリ開発ツール Skeet について、Web フロントエンドを Next.js v14 にアップグレードしたことを発表しました。

このアップグレードは、Skeet がさらに効率的かつ効果的にアプリケーションを開発できるようにするもので、Next.js v14 の改善点を活用しパフォーマンスが向上しています。

Next.js 14 リリースノート: https://nextjs.org/blog/next-14

## 開発環境の高速化

Rust ベース の Turbopack は、Skeet プロジェクトにおけるパフォーマンスチューニングに大いに貢献しています。Rust は高性能かつ安全性に優れたプログラミング言語であり、Turbopack はローカルサーバーの起動速度を 53%向上させ、Fast Refresh によるコードの更新速度を 94%向上させることで、開発効率を大幅に向上させています。

## 引き続き Page Router を採用

Skeet は、歴史ある Next.js のルーティング技術である Page Router を採用しています。Page Router は枯れた技術であり、周辺技術のサポートを受けやすい状態にあります。一方で、新しい App Router 技術にも注目しており、周辺技術が充実する頃に移行を考えています。現時点では Page Router がより安定しているため、Skeet プロジェクトはこれを採用しています。

## Static Site Generation (SSG) からスタート

Skeet はコストメリットから、初期のプロジェクトで Server-Side Rendering (SSR)ではなく、Static Site Generation (SSG) でスタートできるように設定しています。SSG は静的コンテンツの事前生成を可能にし、それにより高速なページロード速度と SEO の向上を実現しています。一方、SSR は必要に応じて動的コンテンツを生成し、これによりアプリケーションはリアルタイムのデータに対応できます。
必要に迫られたときには SSR へ移行しやすくなっており、これは Next.js の思想とも一致しています。

また、Skeet はすべてにおいて段階的な移行が可能であり、様子を見ながらフロントエンドインフラとして Vercel の採用も可能になっています。

詳細: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

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
