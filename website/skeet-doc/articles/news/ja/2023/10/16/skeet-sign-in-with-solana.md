---
id: skeet-sign-in-with-solana
title: オープンソースサーバーレスフレームワークのSkeetが "Sign In With Solana" (SIWS) に対応
category: プレスリリース
thumbnail: /news/2023/10/16/SkeetSignInWithSolana.png
---

ELSOUL LABO B.V. (エルソウルラボ、本社: オランダ アムステルダム、代表取締役 CEO: 川崎文武)は、同社の開発するオープンソースサーバーレスフレームワークの Skeet が、Solana ブロックチェーンの "Sign In With Solana" (SIWS) に対応したことを発表しました。

「Sign In With Solana」（SIWS）に対応することで、Skeet はそのセキュリティ機能を強化し、dApp 開発においてより堅牢な Web3 インフラを提供します。メッセージ形式の標準化により、ウォレットがユーザーに警告を出せるようになり、より安全なユーザーエクスペリエンスが実現します。

Solana のエコシステムが今後、より一層の標準化に向かう中で、Skeet はこれらの進化するニーズに適応する包括的な開発インフラとして成長していきます。

## Sign In With Solana (SIWS) とは

![Sign In With Solana](/news/2023/10/16/SignInWithSolana.png)

SIWS は、Solana ブロックチェーン上でアプリケーションがユーザーを認証するための標準化された方法です。
従来の「connect + signMessage」フローに代わる、より簡単で安全なワンクリックのサインイン方法を提供します。

現状のウォレットサインインの課題は以下のとおりです。

- ユーザーエクスペリエンスは一貫していません。各 dapp が独自のメッセージ形式を持っているため、ユーザーは何を期待すればよいのかわかりません。
- メッセージ形式の標準化がないため、ウォレットは混乱するようなプレーンテキストのメッセージを表示することになり、これがさらにユーザーを困惑させます。
- 正当な dapp であるかのように偽装した悪意のあるウェブサイトが、ユーザーをだましてメッセージに署名させることができ、ウォレットもユーザーも介入することができません。
- 従来の「connect + signMessage」は、直感に反する複数のステップが必要です。

Sign In With Solana（SIWS）は、これらの課題に対する包括的な解決策を提供します。

SIWS の技術仕様は、EIP-4361（Sign In With Ethereum）をモデルにしていますが、その機能を超えて拡張されています。

SIWS は、メッセージ構築の責任を dapps（分散型アプリケーション）からウォレットに移すことで、一貫したユーザーフレンドリーなインターフェースと、エンドユーザーのセキュリティを強化します。

さらに、SIWS はメッセージ形式を標準化することで、ウォレットがメッセージデータを詳細に調査し、その正当性を確認するか、怪しい活動に対して警告を発することが可能になります。ドメインバインディングは SIWS の重要な特長であり、ウォレットがユーザーに警告を出すことで、あるウェブサイトが別のエンティティを偽装している場合に対処します。

SIWS の仕様は Solana ウォレットの Phantom がオープンソースとして公開、管理を行っています。

https://github.com/phantom/sign-in-with-solana

技術的な解説については下記記事をご覧ください。

忙しい人のための Sign In With Solana (SIWS) - Zenn:

https://zenn.dev/ki4themecha2q/articles/85b8725a142f76

## Skeet とは

![Skeet AI Auto Coding](/news/2023/09/15/SkeetJA.png)

Skeet は GCP (Google Cloud) と Firebase 上にフルスタックアプリを構築できるオープンソースの TypeScript 製サーバーレスフレームワークです。

Skeet を使えば、API サーバーから Web・iOS・Android アプリまですべてを TypeScript で爆速開発することができます。GraphQL や Firestore など、開発者体験の評判が良い技術を積極的に採用しています。

ChatGPT や Vertex AI などの AI を活用したアプリケーション開発や Solana などのブロックチェーンを活用した Web3 dApp 開発も簡単に行うことができる現代的なアプリケーションフレームワークとなっています。

下記リンクからデモをお試しいただけます。PaLM2・Vertex AI、そして Open AI 社の ChatGPT (GPT-3.5, GPT-4)も同時にお試しいただくことができますので、どちらがどのような特徴を持っているか比較検討していただくことができます。

Skeet デモ:

https://skeeter.dev/ja/

また、こちらのデモのアプリは Skeet CLI を使えば 5 分でご自身の PC 環境やクラウド環境で動かすことが可能です。

まずはどのようなことができるかデモでイメージしていただき、その後は Skeet CLI を使ってすぐにアプリ開発をスタートできます。

Skeet CLI にも AI が搭載されており、チャットによる自動コード生成等の強力なサポートにより、開発者の生産性を大幅に向上させます。

Skeet CLI (GitHub):

https://github.com/elsoul/skeet-cli

Skeet は世界中すべてのアプリケーション開発現場の開発・メンテナンスコストを削減、開発者体験を向上させるためにオープンソースとして開発されています。

詳しくは公式ドキュメントを御覧ください。

Skeet ドキュメント:

https://skeet.dev/ja/
