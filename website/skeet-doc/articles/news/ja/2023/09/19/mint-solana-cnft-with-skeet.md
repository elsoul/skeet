---
id: mint-solana-cnft-with-skeet
title: Skeetが Solana Compressed NFT (cNFT) に対応。10億個規模のNFTコレクションも低コストで発行可能に。
category: プレスリリース
thumbnail: /news/2023/09/19/ToTheBillionScaleMintCNFT.png
---

ELSOUL LABO B.V. (エルソウルラボ, 本社: オランダ・アムステルダム) は、オープンソースのサーバーレスアプリ開発ツール Skeet が、Web3・ブロックチェーン分野の新技術 Solana Compressed NFT (cNFT) に対応したことを発表しました。

デジタル資産として注目を集めている NFT 技術ですが、大規模な NFT コレクションとなるとブロックチェーン手数料もその分大きくなってしまうため、例えばゲームのアイテム一つずつを NFT で発行したり、全世界のユーザーすべてのプロフィールを NFT で発行するといったことは現実的ではありませんでした。

## Solana Compressed NFT (cNFT) とは

Solana Compressed NFT（圧縮 NFT, cNFT）は、データ量を削減しながらもその真正性を保証するために、Merkle Tree(マークルツリー)などのデータ構造を用いて効率的に管理される NFT です。

Solana チェーンはデフォルトでも比較的安価ですが、それでも NFT 一つの Mint に対して 0.012 SOL(35 円 : SOL=20 ドル、1 ドル 147 円で計算)が、線形にスケールするので、10,000 個の NFT コレクションでは 350,000 円、10 億個の NFT を作ると 350 億円必要になってしまい、大規模の NFT コレクションを取り扱うのは現実的ではありませんでした。

そこで開発されたのが、Compressed NFT (cNFT) という新しい NFT を作る方法です。cNFT であれば、10,000 個の NFT コレクションを約 10,290 円(34 分の 1)、10 億個であっても約 147 万円(24,000 分の 1)と、現実的なコストで NFT コレクションを発行することができます。

![Solana Compressed NFT](/news/2023/09/19/mint-solana-cnft.png)

Skeet は、2 つの Solana を代表するプロトコルである Metaplex 及び Helius の技術を組み込みました。

Metaplex は Solana の NFT プロトコルで、トークンスタンダード等を制定しています。NFT を取り扱ったり、Solana トランザクションを行うためのフレームワーク umi の提供、また、cNFT を発行するための Bubblegum というツールを提供しています。

Metaplex: https://www.metaplex.com/

Helius は、Solana のハイパフォーマンス RPC 及び、cNFT の利用に必要な デジタルアセットスタンダード(DAS: Digital Asset Standard) API を提供しています。

Helius: https://www.helius.dev/

Skeet は、これらの技術を活用し、開発者がすぐに Solana Compressed NFT (cNFT) を利用することができるようになりました。

下記の記事では、Skeet を使って実際に cNFT を発行する方法を解説しています。

https://zenn.dev/ki4themecha2q/articles/7dcb9753783a23

## Google Cloud、Firebase 上でサーバーレスアプリを爆速開発できるオープンソースの Skeet フレームワーク

![Skeet AI Auto Coding](/news/2023/09/15/SkeetJA.png)

Skeet は GCP (Google Cloud) と Firebase 上にフルスタックアプリを構築できるオープンソースの TypeScript 製サーバーレスフレームワークです。

Skeet を使えば、API サーバーから Web・iOS・Android アプリまですべてを TypeScript で爆速開発することができます。GraphQL や Firestore など、開発者体験の評判が良い技術を積極的に採用しています。ChatGPT や Vertex AI などの AI を活用したアプリケーション開発や Solana などのブロックチェーンを活用した Web3 dApp 開発も簡単に行うことができる現代的なアプリケーションフレームワークとなっています。

下記リンクからデモをお試しいただけます。PaLM2・Vertex AI、そして Open AI 社の ChatGPT (GPT-3.5, GPT-4)も同時にお試しいただくことができますので、どちらがどのような特徴を持っているか比較検討していただくことができます。

Skeet デモ: https://skeeter.dev/ja/

また、こちらのデモのアプリは Skeet CLI を使えば 5 分でご自身の PC 環境やクラウド環境で動かすことが可能です。

まずはどのようなことができるかデモでイメージしていただき、その後は Skeet CLI を使ってすぐにアプリ開発をスタートできます。Skeet CLI にも AI が搭載されており、チャットによるコード生成等の強力なサポートにより、開発者の生産性を大幅に向上させます。

Skeet CLI (GitHub): https://github.com/elsoul/skeet-cli

Skeet は世界中すべてのアプリケーション開発現場の開発・メンテナンスコストを削減、開発者体験を向上させるためにオープンソースとして開発されています。

詳しくは公式ドキュメントを御覧ください。

Skeet ドキュメント: https://skeet.dev/ja/
