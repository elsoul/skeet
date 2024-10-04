---
id: skeet-meets-vertex-ai
title: オープンソースアプリフレームワーク "Skeet" が ChatGPT だけでなく Google AI にも対応。より柔軟なカスタマイズが可能に。
category: プレスリリース
thumbnail: /news/2023/08/11/SkeetMeetsVertexAI.png
---

ELSOUL LABO B.V. (エルソウルラボ, 本社: オランダ・アムステルダム) は、オープンソース の TypeScript フルスタックサーバーレスアプリフレームワーク "Skeet" Version 1.1.0 のリリースを発表しました。

Skeet は GCP (Google Cloud) と Firebase 上にフルスタックアプリを構築できるオープンソースの TypeScript 製サーバーレスフレームワークです。

API サーバーから Web・iOS・Android アプリまでを TypeScript で一貫して超速開発することができます。

今回のアップデートにより、Skeet は OpenAI 社の ChatGPT(GPT-4 等)に加えて、Google 社の Vertex AI にも対応いたしました。

Vertex AI は Google Cloud による、あらゆるユースケースに対応したフルマネージドの機械学習(ML)ツールで、ML モデルの構築、デプロイ、スケーリングを高速化します。

Vertex AI ドキュメント: https://cloud.google.com/vertex-ai?hl=ja

## Google 社製の生成 AI

![Google Generative AI](/news/2023/08/11/BuildWithGoogleAi.png)

Vertex AI は最近、同じく Google 社製の PaLM2 と呼ばれる大規模言語モデル(LLM)にも対応し、生成 AI(Generative AI)のサポートを追加しました。

PaLM2 は多言語、多様な事前トレーニングデータセットを使用して効率的に学習しており、少ないトークン数や小さいモデルにおいても性能が向上しています。

特に優れているのはプロンプトの調整やファインチューニングで、自社のビジネス用にモデルをカスタマイズした際におけるアウトプットの質が ChatGPT 等の競合製品と比べて高いので、自社オリジナルの AI チャットアプリを開発するのに向いています。

Skeet を使えばすぐに Vertex AI を活用して、自社専用にカスタマイズしたオリジナル AI のアプリを立ち上げることができます。

詳細は下記リリースノートをお読みください。

Skeet v1.1.0 リリースノート: https://github.com/elsoul/skeet-cli/releases/tag/v1.1.0

Skeet は世界中すべてのアプリケーション開発現場の開発・メンテナンスコストを削減、開発者体験を向上させるためにオープンソースとして開発されています。

詳しくは公式ドキュメントを御覧ください。

Skeet ドキュメント: https://skeet.dev/ja/
