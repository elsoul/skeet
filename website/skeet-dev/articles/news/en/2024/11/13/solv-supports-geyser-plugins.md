---
id: solv-supports-geyser-plugins
title: Open-Source Solana RPC Tool "solv" Supports Geyser Plugins
category: Press Release
thumbnail: /news/2024/11/13/solvSupportsGeyserPlugins.jpg
---

ELSOUL LABO B.V. (Headquarters: Amsterdam, Netherlands, CEO: Fumitake Kawasaki) and Validators DAO operate the high-speed, efficient RPC service "ERPC" for the Solana network. To further enhance service quality, we conduct continuous research and development, sharing these advancements with the broader community by making the software tool "solv" available as open-source to support the growth of the Solana blockchain. We are pleased to announce that solv supports Geyser plugins.

## Solana RPC Geyser Plugin

The Solana Geyser Plugin is a mechanism developed to reduce the load on validator nodes by routing RPC requests to separate memory locations. RPC (Remote Procedure Call) is a protocol that allows users to connect to Solana nodes on the network to read and write information. However, during high-traffic periods, RPC service providers can become overwhelmed by excessive requests, which can cause Solana validators to fall behind the node leader, impacting network performance.

By utilizing the Solana Geyser Plugin, developers can access certain data without having to make on-chain requests. By integrating external data stores such as Kafka and PostgreSQL, it becomes possible to reduce RPC resource consumption when retrieving data like accounts, blocks, and slots, thereby easing network load.

Solana Geyser Plugin Interface: https://crates.io/crates/solana-geyser-plugin-interface

For example, the Geyser Yellowstone Plugin provides gRPC connectivity to monitor and notify users of changes on the blockchain. This functionality is also used by APIs like Jupiter Swap, enabling traders to detect market changes at maximum speed. With "solv," traders can set up an ideal RPC environment on their high-performance machines quickly, ensuring they receive optimal performance and timely market information.

For more details, please refer to the official solv documentation.

solv - Geyser Plugin: https://solv.epics.dev/en/doc/quickstart/geyser-plugin/

## Solana RPC and Validator Tool - solv

![solv](/news/2024/11/06/solv.jpg)

solv is an open-source tool designed to simplify the setup and operation of Solana validators and RPC nodes. By using solv, essential tasks such as setting up, operating, monitoring, alerting, and upgrading Solana validators and RPC nodes can be performed easily and without hassle.

solv: https://solv.epics.dev/

## ERPC - Enhanced Solana RPC

![ERPC](/news/2024/11/06/ERPC.jpg)

### 1. Fastest Transactions Anytime, Anywhere

![ERPC Global Edge Proxy](/news/2024/11/12/ERPCProxyEN.jpg)

ERPC utilizes edge servers deployed globally, automatically selecting the optimal RPC node for each user access. This ensures a rapid and smooth environment for transactions and data requests on the Solana network.

- **Optimized Global Proxy Network**  
  With over 300 edge servers worldwide, the network automatically selects the nearest server, enabling high-speed access from any region. Stable connections are assured, enhancing the experience for dApp users and traders.

### 2. Optimal RPC Node Selection for Maximum Performance

![ERPC Best Node Choice](/news/2024/11/12/ERPCBestChoiceEN.jpg)

ERPC supports a wide range of Solana RPC requirements, such as Geyser and DAS API. It automatically selects the best node during each access, ensuring optimal performance.

- **Best Node for Various Requirements**  
  Nodes are configured to meet Solana's broad range of requirements (Geyser, DAS API, etc.). The optimal RPC node is chosen for each access, ensuring high-speed processing of transactions and data requests.

### 3. High-Speed Trading with Dedicated Jupiter API Endpoints

![ERPC Jupiter](/news/2024/11/12/ERPCJupiterEN.jpg)

ERPC provides dedicated endpoints for the Jupiter API, avoiding public API congestion. This enables smooth token swaps, minimized network latency, and stable connections for fast, strategic trades.

- **Unlock New Trading Opportunities**  
  Leveraging dedicated Jupiter API endpoints allows traders to avoid congestion, creating a high-performance trading environment. Traders benefit from stable, high-speed transactions even under heavy load.

## ERPC Features and Benefits

ERPC is an RPC service backed by advanced technology and edge infrastructure, providing the following benefits:

- **Service Options Tailored to User Needs**  
  Services are available based on the user's stage, allowing them to choose the best service aligned with their project scale. Payment options include both credit and cryptocurrency.
- **Fastest Dedicated RPC Connections**  
  ERPC’s dedicated RPC connections eliminate unnecessary logic associated with shared security protocols, enabling the fastest connections for Solana execution. Measured latency for simple read requests is as low as 2-3 ms round-trip. For more details, please reach out to our team on the official Discord.

ERPC: https://erpc.validators.solutions/en/

Official Discord: https://discord.gg/C7ZQSrCkYR

![ERPC Price](/news/2024/11/12/ERPCPriceEN.jpg)

### Free Trial Now Available!

ERPC is currently offering a free trial. Take this opportunity to experience high-speed, reliable RPC on the Solana network. Enjoy an optimized access environment with high performance from any region.

For details and registration, please check the official Discord.

Official Discord: https://discord.gg/C7ZQSrCkYR

※ This article is not intended as investment advice. The information contained herein is accurate as of the time of writing. Please verify the latest information and always practice NFA / DYOR.
