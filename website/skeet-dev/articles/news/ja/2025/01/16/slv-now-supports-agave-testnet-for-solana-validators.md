---
id: slv-now-supports-agave-testnet-for-solana-validators
title: SLV、Solanaバリデータ向けAgaveテストネットへの簡単切り替え対応を発表
category: プレスリリース
thumbnail: /news/2025/01/16/SLV-Now-Supports-Agave-Testnet-JA.jpg
---

ELSOUL LABO B.V.（本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武）と、Solana ネットワークの分散化とセキュリティ強化を推進する Validators DAO は、Solana 開発ツール「SLV」において、Agave テストネットと Firedancer（Frankendancer）間の切り替えを大幅に簡略化する新機能をリリースしたことを発表しました。

## SLV が Agave テストネットと Firedancer をサポート

![SLV](/news/2025/01/09/SLVtopJA.jpg)

SLV は Solana バリデータの立ち上げと運用を簡単にできるオープンソースツールです。

このたび、Agave テストネットおよび Firedancer（Frankendancer）間のバージョン切り替えを、数回のコマンド操作で簡単に行えるようになりました。

このアップデートにより、現在 Solana Foundation が推進する Delegation Program に参加しているバリデータは、頻繁なバージョン変更やテスト環境の切り替えにかかる運用コストを大幅に削減できます。

## テストネット切り替えが重要な理由

Solana Foundation は現在、新世代クライアントソフトウェアである Firedancer (Frankendancer) と Agave の両方を用いて本格的に動作確認テストを実施中です。

以下は Foundation からの最近のアナウンス内容です：

- Agave v2.1.7 をテスト
- テストネットロールバック & 再起動
- Frankendancer の停止、すべてのバリデータは Agave に切り替え
- Agave v2.0 と v2.1 を行き来しながらの環境テスト
- Frankendancer のテストネット導入を目指す計画

2025 01 14 Testnet Rollback and Restart from Agave: https://github.com/anza-xyz/agave/wiki/2025-01-14-Testnet-Rollback-and-Restart

これらのテストには、バリデータが頻繁に設定を変更し、異なるバージョン間での切り替えを迅速に行う必要があります。

従来、この作業は複雑でエラーも起きやすいものでしたが、SLV を使用することで以下の利点が得られます：

- **簡略化された切り替え操作**：数回のコマンドで設定変更が完了
- **運用負荷の軽減**：SSH 接続や手動設定を排除
- **高い再現性**：リモート管理による安定した運用

詳細な操作手順やリリース情報については、公式リリースノートをご参照ください：

SLV GitHub リリースページ: https://github.com/ValidatorsDAO/slv/releases

## SLV の今後について

SLV は単なるバリデータ運用ツールに留まらず、Solana エコシステム全体を支える包括的プラットフォームへと進化を続けています。
今回の Agave / Firedancer 対応はその一例です。

今後もアップデートを重ねることで、より多くのバリデータや開発者が簡単かつ安定的に運用を行えるソリューションを提供してまいります。

最新情報やドキュメントは以下からご確認ください：

- SLV ドキュメント（日本語）：https://slv.dev/ja
- Validators DAO 公式 Discord：https://discord.gg/C7ZQSrCkYR
