---
id: solv-mev-mode-released
title: Introducing the New 'solv MEV Mode' - Automating Solana Validator Operations and Optimizing Rewards
category: Press Release
thumbnail: /news/2024/07/11/solvMEVMode.jpg
---

ELSOUL LABO B.V. (Headquarters: Amsterdam, Netherlands, CEO: Fumitake Kawasaki) and Epics DAO, an organization established by ELSOUL LABO to support open-source software development and operate a Web3 NFT card game, are promoting innovation and sustainable development in blockchain technology through the development and operation of the open-source software "solv" for Solana blockchain validators. After 18 months of operation, its performance and reliability have been proven, and it is now widely used by many users on both the Solana mainnet and testnet.

We are pleased to announce the release of the new "solv MEV Mode," which automates Solana validator operations and optimizes rewards.

## Challenges in Solana Validator Operations

All activities on the Solana blockchain (Web3 applications, dApps, token transactions, etc.) are supported by validators worldwide. Currently, about 1,500 Solana mainnet validators are operational, many of which are managed by individuals.

Validators are distributed globally and operate while balancing family and work responsibilities. Updates are required several times a week, but for validators in Japan, they often occur late at night, necessitating prompt action. Delays in updates can affect their trust score, resulting in penalties and impacting their rewards.

Furthermore, validators need to manage voting and validation costs as well as rewards. The Solana blockchain operates on an epoch-based system, with evaluations and reward calculations occurring every epoch. However, since an epoch is not linked to a 24-hour cycle, regular management is challenging.

## About the New "solv MEV Mode"

The new "solv MEV Mode" frees validators from daily SSH access to their nodes and enables automated reward maximization and compounding. The node's status is constantly monitored, and any anomalies are immediately notified via Discord, allowing validators to operate with peace of mind.

**Key Features:**

- **Automatic Updates:** Solv MEV Mode automatically updates the Solana validator client and solv software version, ensuring the latest version is always running.
- **Monitoring:** It monitors the health and balance of validators and sends notifications to Discord if any anomalies are detected.
- **Automatic Reward Harvesting:** Rewards are harvested just before the end of an epoch to optimize returns.
- **Automatic Staking:** Harvested rewards are converted to LST (Liquid Staking Token - elSOL) and sent to the specified account.
- **Enhanced Security:** By keeping the SOL balance of the validator node low and converting rewards to LST, it mitigates the risk of large SOL withdrawals and maintains high returns.

For more details on solv MEV Mode and configuration instructions, please refer to the following documentation:

https://solv.epics.dev/en/doc/quickstart/solv-mev-mode/

※ MEV stands for Maximum Extractable Value, which refers to the pursuit of as much profit as possible.

## What is elSOL?

![elSOL](/news/2024/07/05/elSOLlst.jpg)

elSOL is a tokenized representation (LST: Liquid Staking Token) of a staking account based on a high-quality validator pool managed by the solv development team. This pool is composed of multiple experienced and high-quality validators, ensuring high validator scores and stability by performing software updates with no downtime. These validators operate with a user fee of 0%, providing an efficient and cost-effective staking solution.

elSOL - SOLscan: https://solscan.io/token/ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL utilizes the official Solana Stake Pool program, increasing the value of the underlying staking accounts after each epoch, which in turn increases the amount of SOL each elSOL represents.

Solana Stake Pool Program: https://spl.solana.com/stake-pool

## Why elSOL?

The main advantage of elSOL is its composability. Tokenized staking accounts can be used by any program that operates on tokens. This allows elSOL to integrate with other Solana DeFi protocols like Jupiter, providing various financial services.

Jupiter: https://jup.ag/swap/SOL-ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL is also listed in liquidity pools on Orca, where you can stake SOL into elSOL and supply it to liquidity pools to maximize your rewards.

Orca elSOL Liquidity Pool (LP): https://www.orca.so/pools?tokens=ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

By holding elSOL, you can retain an asset that increases in value relative to SOL while using almost any Solana program. This opens up new opportunities to leverage staked assets.

## Benefits of Holding elSOL

1. **Ensured Immediate Liquidity:** With elSOL, you can ensure immediate liquidity without waiting for the end of an epoch. For example, if you need 5 SOL to purchase an NFT, you can instantly swap elSOL for SOL, while the remaining elSOL continues to earn rewards.
2. **Automatic MEV Reward Collection and Compounding:** elSOL automatically collects MEV rewards and compounds them, increasing its value relative to SOL. This is more efficient than manually collecting and reinvesting MEV rewards.

Currently, elSOL can be staked easily with just one command using the solv CLI. An elSOL application will soon be released, allowing staking via UI.

## ELSOUL LABO and Epics DAO

ELSOUL LABO and Epics DAO's core teams are actively involved in open-source software development.

They operate two open-source software projects, "solv" and "Skeet."

![solv](/news/2024/03/12/solvEN.jpg)

"solv" is an open-source tool simplifying the setup and operation of Solana validators and RPC nodes. To earn rewards as a blockchain validator, machine resources of proper specifications are needed, and validator software installation and setup should be completed per documentation, followed by several updates each week.

With "solv," Solana validators can be easily launched with just three commands. Updates require only one command, utilizing the open-source nature so that a single person worldwide can manage the update, and others can download it. solv documentation: https://solv.epics.dev

![Skeet](/news/2024/03/12/SkeetV2EN.jpg)

"Skeet" is an open-source, serverless app development tool using TypeScript, offering a modern application framework for infrastructure management, rapid app development, AI support, and dApp/Web3 development.

Skeet documentation: https://skeet.dev

The Skeet development team's paper, "Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development," was presented at ENASE 2024, an international software engineering conference held in Angers, France, on April 28-29, 2024. Dr. James represented the team and received high acclaim for his presentation.

ENASE 2024: https://enase.scitevents.org

![ENASE 2024 - Skeet](/news/2024/05/10/SkeetENASE2024ResearchPaperPublished.jpg)

![ENASE 2024 - Skeet Dev](/news/2024/05/02/ENASEelsoulTeam.jpg)

This study proposes a lightweight serverless framework for modern AI-driven application development. The research was published in the conference proceedings and indexed in Google Scholar, Scopus, and other major databases, making it widely accessible to the research community.

「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」 - SciTePress: https://www.scitepress.org/PublicationsDetail.aspx?ID=Rza3TGE30Xw=&t=1

![ENASE 2024 - Skeet paper](/news/2024/04/24/ENASE2024AfterTheConference.jpg)

We will continue promoting innovation, engaging in open-source software development, and supporting the overall development environment of open-source projects.

**Company Overview**

- Name: ELSOUL LABO B.V.
- CEOs: Fumitake Kawasaki, Shota Kishi
- Business: Software research and development (AI, cloud, blockchain)
- Founded: September 2020
- Location: Weteringschans 165, 1017XD Amsterdam, Netherlands
- Accreditations: WBSO (Advanced R&D) from the Dutch government, Google Cloud Build partner, ENASE2024 paper selection
- URL: https://labo.elsoul.nl
- Discord: https://discord.gg/H2HeqRq54J
- Press Kit: https://labo.elsoul.nl/en/press-kits

**DAO Overview**

- DAO Name: Epics DAO
- Founders: Fumitake Kawasaki, Shota Kishi
- Business: Research, development, and operation of blockchain games for social impact
- Founded: June 2022
- Award: 5th place, Solana Summer Camp Hackathon 2022
- URL: https://epics.dev
- Twitter: https://twitter.com/EpicsDAO2
- Discord: https://discord.gg/GmHYfyRamx

※ This article is not intended for investment advice. The information contained in this article is based on the situation at the time of writing. Please check for the most current information. Always NFA/DYOR.
