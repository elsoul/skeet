---
id: started-maintain-dedicated-shredstream-proxy
title: Solana バリデータ運用効率向上のため専有 ShredStream を構築、さらなる低レイテンシブロック更新の実現
category: プレスリリース
thumbnail: /news/2024/11/22/DedicatedShredStreamProxyJA.jpg
---

ELSOUL LABO B.V.（本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武）と Epics DAO、及び Validators DAO は、Solana ブロックチェーンにおけるバリデータ運用効率向上を目指して、専有 ShredStream Proxy の運用を開始いたしました。

## ShredStream とは？

ShredStream は、Solana ネットワークのリーダーから配信される Shreds を最短時間で受信可能にするサービスです。

Shreds とは、Solana ネットワークでトランザクションデータを効率的に伝播させるために分割されたデータ断片のことです。これにより、ブロック生成や取引の伝播速度が劇的に向上し、高スループットと低レイテンシを支える基盤となっています。

専有の ShredStream Proxy を構築することで、バリデータはネットワーク全体のブロックデータを最速で受信し、以下のメリットが得られます：

- **更に低いレイテンシ通信の実現:** 専有の ShredStream Proxy により、ブロック更新速度が大幅に向上。特に高頻度投票が要求される場面で優位性を発揮します。
- **バリデータ運用効率の向上:** 高速なデータ処理により、投票率の向上とブロック報酬の最大化を実現。

すでに ELSOUL LABO および Epics DAO の運用する Solana メインネットバリデータでは、この技術が導入されています。導入後、ブロック報酬の増加と運用効率の改善が確認されており、ステーカーの皆さまへ安定した高いリターンを提供する基盤が整いました。

下記リンクより、これらの高性能バリデータに手数料無料でステーキングが可能となっております。

SOL ステーキング: https://labo.elsoul.nl/ja/staking/

参考 - Low Latency Block Updates (Shredstream) by Jito Labs: https://docs.jito.wtf/lowlatencytxnfeed/

## オープンソースツール solv への統合予定

![solv](/news/2024/11/22/solvTopJA.jpg)

Solana ネットワーク全体の品質向上に繋げるため、私たちはオープンソースの Solana Validator ツール 「solv」 にこのShredStream Proxy構築機能を統合する計画を進めています。solv はすでに Jito Relayer のセットアップをサポートしており、バリデータ運用者にとっての利便性を追求しています。

solv は、Solana ネットワーク全体の品質と運用効率を向上させることを目的に、オープンソースとして開発・公開されています。この新機能もネットワーク全体の向上に寄与するため、優先的に統合し、早期公開を目指します。

solv の詳細情報やアップデートは、以下をご確認ください：

- solv 公式ドキュメント: https://solv.epics.dev/ja
- GitHub: https://github.com/EpicsDAO/solv
- Validators DAO 公式 Discord: https://discord.gg/C7ZQSrCkYR

ELSOUL LABO B.V. と Epics DAO、Validators DAO は、Solana ネットワークの品質向上に向けて、コミュニティと共に発展を続けてまいります。引き続きご注目ください。

※ 本記事は投資助言などを目的としたものではありません。また、本記事に記載された情報は、執筆時点のものです。最新の情報をご確認ください。常に NFA / DYOR でお願いいたします。
