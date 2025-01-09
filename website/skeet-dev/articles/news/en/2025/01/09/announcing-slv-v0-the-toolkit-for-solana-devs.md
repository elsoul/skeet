---
id: announcing-slv-v0-the-toolkit-for-solana-devs
title: Announcing SLV, the Toolkit for Solana Devs. Now Supporting Testnet Firedancer
category: Press Release
thumbnail: /news/2025/01/09/SLVogp.jpg
---

ELSOUL LABO B.V. (Headquarters: Amsterdam, the Netherlands; CEO: Fumitake Kawasaki), together with the Validators DAO—which promotes decentralization and security for the Solana network—announces the release of SLV v0, the Toolkit for Solana Devs, along with support for Testnet Firedancer.

![SLV](/news/2025/01/09/SLVtopEN.jpg)

## Remote Management × Keyless Operation

SLV is developed based on the open-source software “solv.” Previously, solv required managing both keys and configuration files directly on nodes, resulting in high operational overhead, especially during recovery from node failures or system migrations.

With SLV, all configuration is managed locally, and private keys never reside on the node itself—an approach known as “keyless operation.” Nodes are first launched using a dummy key, and actual keys are only inserted when required, eliminating the risk of penalties due to unintended simultaneous node launches.

Additionally, no SSH connections are needed to install, update, or recover a node, significantly enhancing both security and usability. SLV also supports zero-downtime node migrations, ensuring smooth operations even when changing server specifications or responding to unforeseen issues.

## Swift Adaptation to Testnet Firedancer

“Firedancer,” the next-generation Solana client software that has become mandatory for Solana Delegation Program participants, is set to begin full-scale operation on the testnet by this coming weekend. Many validators find themselves in urgent need of a quick transition to this new environment.

With SLV, you can install and update Firedancer without manually configuring each node or relying on SSH connections—everything is handled remotely and efficiently from your local machine. Existing solv users can seamlessly migrate to SLV and switch over to Firedancer thanks to reproducible remote management.

By minimizing security risks and ensuring stable operation on the testnet, SLV is an optimal choice for validators participating in the Solana Delegation Program.

## Expanded Monitoring Capabilities

![SLV](/news/2025/01/09/SLVmonitoring.png)

SLV comes equipped with native monitoring features powered by Prometheus and Grafana. This setup provides clear visibility into critical metrics such as network load, potential downtime risks, and CPU/memory usage. Operators can identify and respond to issues early on, all while accessing node status at a glance, even when working remotely.

## Integrating Insights from the “Skeet” Serverless Framework

By merging experience from “solv” with the serverless framework “Skeet,” SLV goes beyond managing validators and RPC nodes to serve as an all-in-one solution for developing Solana-based applications.

Through one-command deployments from your local environment to global edge servers, SLV supports everything from lightweight trading apps to large-scale DeFi projects. And by integrating with the global proxy for RPC servers, SLV provides consistently stable, low-latency connections worldwide.

## Collaboration with Global Edge Data Centers

ELSOUL LABO B.V. and Validators DAO are establishing Solana-focused global edge data centers to enhance the quality of validator and RPC operations. Going forward, the “SLV Cloud” initiative will aim to co-locate RPC servers and applications to achieve ultra-low latency and high efficiency. Through this collaboration, we plan to deliver an even more seamless Web3 experience for a broader user base.

## Future Outlook and Community

As an end-to-end platform supporting development, operation, and monitoring on Solana, SLV will continue to expand its functionality. Please visit the links below for the latest information and documentation. The official Validators DAO Discord is home to numerous experienced validators, offering active discussion and troubleshooting support. We encourage you to join our community.

- SLV Documentation: https://slv.dev/
- Validators DAO Official Discord: https://discord.gg/C7ZQSrCkYR

We look forward to supporting the continued evolution and decentralization of the Solana ecosystem. From validator and RPC operations to application development, SLV provides comprehensive support. Stay tuned for more updates!
