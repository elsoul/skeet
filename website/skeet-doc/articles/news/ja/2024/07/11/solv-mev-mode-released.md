---
id: solv-mev-mode-released
title: Solana バリデーター運用の自動化と報酬最適化を実現する新機能「solv MEV モード」をリリース
category: プレスリリース
thumbnail: /news/2024/07/11/solvMEVMode.jpg
---

ELSOUL LABO B.V.（本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武）と同社が設立したオープンソースソフトウェア開発を支援する Web3 NFT カードゲームを運営する Epics DAO は、Solana ブロックチェーンのバリデーター向けオープンソースソフトウェア「solv」の開発と運用を通じて、ブロックチェーン技術のイノベーションと持続可能な開発を推進しています。1 年半にわたる運用でその性能と信頼性が実証され、現在は多くのユーザーにより Solana ブロックチェーンのメインネットおよびテストネット上で幅広く利用されています。

この度、Solana バリデーター運用の自動化と報酬最適化を実現する新機能「solv MEV モード」をリリースいたしました。

## Solana バリデーター運用上の課題

Solana ブロックチェーン上のすべての活動（Web3 アプリ、dApp、トークン取引など）は、世界中のバリデーターによって支えられています。現在、約 1,500 台の Solana メインネットバリデーターが稼働しており、その多くは個人によって運用されています。

バリデーターは世界中に分布し、タイムゾーンが異なるため、各自が家族や仕事と両立しながら運用しています。アップデートは週に数回必要ですが、日本のバリデーターにとっては深夜に当たることも多い中で、迅速な対応が求められます。アップデートが遅れると信用スコアに影響し、ペナルティが課され報酬に影響してしまうこともあります。

さらに、バリデーターは投票・検証コストの維持管理や報酬管理も行う必要があります。Solana ブロックチェーンにはエポックという時間単位があり、1 エポックごとに評価や報酬計算が行われますが、このエポックは 24 時間と連動しておらず、定期的な管理が難しいのが現状です。

## 新機能: solv MEV モードについて

新しい「solv MEV モード」では、バリデーターは日常的なノードへの SSH アクセスから解放され、自動で報酬最大化と複利化を実現することが可能となります。ノードの状態も常に監視され、異常があればすぐに Discord で通知されるため、バリデーターは常に安心して運用を行うことができます。

**主な特徴:**

- **自動更新:** solv MEV モードは Solana バリデータークライアント および solv のソフトウェアバージョンを自動的に更新し、常に最新バージョンを実行します。
- **モニタリング:** バリデータの健康状態と残高を監視し、異常があれば Discord に通知を送信します。
- **報酬の自動収穫:** エポック終了直前に報酬を収穫し、利回りを最適化します。
- **自動ステーキング:** 報酬を LST（Liquid Staking Token - elSOL）に変換し、指定したアカウントに送信します。
- **セキュリティの強化:** バリデータノードの SOL 残高を低く保ち、大規模な SOL 引き出しのリスクを軽減し、高い利回りを維持します。

solv MEV モードの詳細、設定方法については下記ドキュメントをご参照ください。

https://solv.epics.dev/ja/doc/quickstart/solv-mev-mode/

※ MEV とは Maximum Extractable Value（最大抽出可能価値）の略で、できる限り多くの利益を追求することを指します。

## elSOL とは？

![elSOL](/news/2024/07/05/elSOLlst.jpg)

elSOL は、solv 開発チームによって管理されている高品質なバリデータープールに基づくステークアカウントをトークン化したもの(LST: Liquid Staking Token)です。このプールは経験豊富で高品質なバリデーター複数台によって構成されており、日頃のソフトウェアアップデートもノーダウンタイムで行われ、高いバリデータースコアと安定性を実現します。このプールを支えるバリデーター達はユーザー手数料 0% で運用されており、効率的でコスト効果の高いステーキングソリューションを提供します。

elSOL - SOLscan: https://solscan.io/token/ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL は Solana 公式の Stake Pool プログラムを利用しており、各エポックの後に基礎となるステークアカウントの価値が増加し、それに伴い各 elSOL が表す SOL の量も増加します。

Solana Stake Pool プログラム: https://spl.solana.com/stake-pool

## なぜ elSOL？

elSOL の主な利点は、そのコンポーザビリティ（相互運用性）です。トークン化されたステークアカウントは、トークンを操作する任意のプログラムで使用できるようになります。これにより、elSOL は Jupiter のような他の Solana DeFi プロトコルと統合され、さまざまな金融サービスを提供することが可能となります。

Jupiter: https://jup.ag/swap/SOL-ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

Orca にも流動性プールが上場されており、SOL をステーキングして elSOL にしながら、さらにその elSOL を流動性プールに供給することで、報酬を最大化することができます。

Orca elSOL 流動性プール (LP): https://www.orca.so/pools?tokens=ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL を保有することで、SOL の価値が増加するアセットを保持しながら、ほぼすべての Solana プログラムを利用できます。これにより、ステークされた資産を活用する新しい機会が生まれます。

## elSOL を保持する利点

1. **即時流動性の確保:** elSOL を使えば、エポックの終了を待つことなくすぐに流動性を確保できます。例えば、NFT を購入するために 5 SOL が必要な場合、elSOL を SOL と即座に交換し、残りの elSOL は引き続き報酬を獲得します。
2. **自動的な MEV 報酬の収集と複利化:** elSOL は自動的に MEV 報酬を収集し、複利化するため、SOL に対する価値が増加します。これは、MEV 報酬を手動で収集して再投資するよりも効率的です。

現在 elSOL は solv CLI を使用してワンコマンドで簡単にステーキングできます。近日中に elSOL アプリケーションをリリースし、UI でのステーキングも可能にする予定となっております。

## エルソウルラボ および Epics DAO について

エルソウルラボ および Epics DAO のコアチームもオープンソースソフトウェアの開発に積極的に携わっております。

「solv」、「Skeet」という 2 つのオープンソースソフトウェアを開発し、これらのオープンソースプロジェクトを運営しています。

![solv](/news/2024/03/12/solvJA.jpg)

「solv」 は Solana バリデーター および RPC ノードのセットアップと運用を簡略化するためのオープンソースツールです。

一般にブロックチェーンバリデーターとして報酬を得るためには、適切なスペックのマシンリソースを用意して、ドキュメントに従ってバリデーター用のソフトウェアをインストール・セットアップを完了させ、週に何回かあるアップデート作業を行う必要があります。

この一連の作業はバリデーター全員が同じ作業をしなければならないなか、サーバー管理者としての専門知識が求められることで、インセンティブを得たいユーザーがいてもその高い参入障壁が問題となっていました。

solv を使えば、たった 3 つのコマンドをコピペするだけで簡単に Solana バリデーターが立ち上がります。オープンソース開発の特性を活かし、アップデートも世界で一人が行えば、あとはそれをダウンロードするだけで完了するようになります。solv ユーザーは、日々のアップデート作業もワンコマンドで終了させることができます。

solv 公式ドキュメント: https://solv.epics.dev

![Skeet](/news/2024/03/12/SkeetV2JA.jpg)

「Skeet」は、TypeScript を使用したオープンソースのサーバーレスアプリ開発ツールであり、インフラ設計や管理の省略、迅速なアプリケーション開発、必要な機能のみを迅速に開発する柔軟性、AI サポートの充実による学習コストの削減、そして dApps や Web3 アプリの開発に対応するなど、現代的なアプリケーションフレームワークを提供します。

Skeet 公式ドキュメント: https://skeet.dev

エルソウルラボの Skeet 開発チームによる研究論文「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」が、2024 年 4 月 28 日と 29 日にフランス・Angers で開催された国際ソフトウェアエンジニアリングカンファレンス、ENASE 2024 で発表されました。ジェームス博士が代表として登壇し、その発表は多くの参加者から高い評価を受けました。

ENASE 2024: https://enase.scitevents.org

![ENASE 2024 - Skeet](/news/2024/05/10/SkeetENASE2024ResearchPaperPublished.jpg)

![ENASE 2024 - Skeet Dev](/news/2024/05/02/ENASEelsoulTeam.jpg)

この研究は、現代の AI 駆動型アプリケーション開発をサポートするための軽量なサーバーレスフレームワークを提案しており、学会のプロシーディングに掲載・出版されました。また、Google Scholar や Scopus をはじめとする複数の主要な学術文献検索サービスにもインデックスされ、広く研究コミュニティに対して利用可能となっています。

研究論文「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」 - SciTePress: https://www.scitepress.org/PublicationsDetail.aspx?ID=Rza3TGE30Xw=&t=1

![ENASE 2024 - Skeet paper](/news/2024/04/24/ENASE2024AfterTheConference.jpg)

今後も様々なイノベーションを促進するべく、積極的にオープンソースソフトウェアの開発に携わり、そしてオープンソースプロジェクトの開発環境全体を応援してまいります。

引き続き応援の程、何卒よろしくお願いいたします。

**■ 会社概要**

- 社名: ELSOUL LABO B.V.
- 代表取締役: 川崎 文武、岸 正太
- 事業内容: ソフトウェア研究開発 (AI・クラウド・ブロックチェーン)
- 設立: 2020 年 9 月
- 所在地: Weteringschans 165, 1017XD Amsterdam, Netherlands
- 認定: オランダ政府より WBSO(先端研究開発) 、Google Cloud Build パートナー 、国際学術会議 ENASE2024 研究論文採択
- 企業 URL: https://labo.elsoul.nl
- 公式 Discord: https://discord.gg/H2HeqRq54J
- プレスキット：https://labo.elsoul.nl/ja/press-kits

**■ DAO 概要**

- DAO 名: Epics DAO
- Founders: 川崎 文武、岸 正太
- 事業内容: 社会貢献型ブロックチェーンゲームの研究開発・運営
- 設立: 2022 年 6 月
- 受賞: Solana Summer Camp Hackathon 2022 5 位
- DAO URL: https://epics.dev
- Twitter URL: https://twitter.com/EpicsDAO2
- 公式 Discord: https://discord.gg/GmHYfyRamx

※ 本記事は投資助言などを目的としたものではありません。また、本記事に記載された情報は、執筆時点のものです。最新の情報をご確認ください。常に NFA / DYOR でお願いいたします。
