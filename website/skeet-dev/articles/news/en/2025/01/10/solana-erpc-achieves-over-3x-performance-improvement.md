---
id: solana-erpc-achieves-over-3x-performance-improvement
title: Solana ERPC Achieves Over 3x Performance Gains in Experimental Rust-Based High-Performance Networking Implementation
category: Press Release
thumbnail: /news/2025/01/10/rust-based-solana-proxy-delivers-3x-performanceEN.jpg
---

ELSOUL LABO B.V. (Headquarters: Amsterdam, the Netherlands; CEO: Fumitake Kawasaki), together with Validators DAO—which promotes decentralization and security for the Solana network—has announced that Solana Enhanced RPC (hereafter “ERPC”) achieved over three times its previous peak performance in an experiment where its Nginx-based proxy was replaced by “Pingora,” a Rust-based high-performance networking framework. The team plans to roll out this new system in production in the coming weeks to further enhance speed and stability.

DeFi trades and NFT mints often require rapid transaction processing, especially during high-traffic periods. Ensuring stable connections under heavy load can help users avoid missed opportunities, so this experimental implementation focused on boosting throughput and reducing latency at peak times.

## Achieving Over 3x Performance with a Pingora-Based Proxy

ERPC leverages a global proxy network of over 300 edge servers worldwide, automatically directing user requests to the nearest server for consistently low-latency and stable connections. In this experiment, the Nginx-based proxy was replaced by the Rust-based high-performance networking framework “Pingora,” resulting in over three times higher performance during peak traffic compared to the previous setup.

Because RPC connections must handle a large volume of requests, improvements in proxy performance directly affect user experience. These results show that even under heavy network traffic and high node loads, Pingora can maintain stable, low-latency connections. As a result, transaction success rates under high load are expected to further improve, reducing the risk of missed trading or minting opportunities for users.

## About the Stress Tests Conducted

To assess the system’s resilience under heavy load, we conducted comparative tests between the Nginx-based and Pingora-based proxies using Vegeta, an open-source load testing tool.

Vegeta (GitHub): https://github.com/tsenart/vegeta

### 10-Second Load Test

**Nginx-Based**

![Nginx](/news/2025/01/10/vegeta-nginx10s.png)

**Pingora-Based**

![Pingora](/news/2025/01/10/vegeta-pingora10s.png)

### 60-Second Load Test

**Nginx-Based**

![Nginx](/news/2025/01/10/vegeta-nginx.png)

**Pingora-Based**

![Pingora](/news/2025/01/10/vegeta-pingora.png)

Comparing these results shows that Pingora consistently processes more traffic at lower latency. Latency was roughly halved for 50% of requests, and reduced to about one-seventh for 90% of requests. Moreover, this advantage becomes increasingly pronounced under sustained high load, demonstrating Pingora’s capacity to maintain low latency even in intensive scenarios.

## No-Downtime Switching and Enhanced Stability

Pingora supports both HTTP/1 and HTTP/2 natively, enabling Graceful Reload (no-downtime restarts). Whereas restarting an Nginx-based proxy would inevitably reset connections, Pingora minimizes disruptions and maintains high service continuity.

Additionally, in the event of updates or server downtime, Pingora instantly fails over to maintain connections, ensuring a stable Solana RPC experience for users.

## Future Updates and Production Rollout

The new proxy is currently being rolled out to production in stages and is scheduled for full deployment by the end of this month. This update will bring even lower latency and higher throughput, enabling smoother transaction processing on the Solana network. A separate announcement will be made once deployment is complete.

Please stay tuned for further news on our official ERPC website and on the Validators DAO Discord.

- ERPC Official Website: https://erpc.global/
- Validators DAO Official Discord: https://discord.gg/C7ZQSrCkYR

## What is ERPC (Solana Enhanced RPC)?

![ERPC](/news/2025/01/10/erpcGlobalEN.jpg)

ERPC is an RPC service designed to offer the fastest transaction processing on the Solana network, anytime and from anywhere.

By utilizing a global proxy of more than 300 edge servers, ERPC automatically directs each user request to the nearest server, providing low-latency, stable connections. This ensures rapid access from any region, and maintains top performance even under heavy loads.

### Key Features

- **Global Proxy**: Over 300 edge servers worldwide, automatically choosing the shortest route
- **Low Latency & High Throughput**: Engineered for peak-time traffic for consistently fast performance
- **Failover & High Availability**: Robust mechanisms to maintain connections during outages

ERPC Official Website: https://erpc.global/

## What is Pingora?

Pingora is an open-source framework developed by Cloudflare for building fast, reliable, and programmable networked systems in Rust.

It has been tested in production at scale, handling over 40 million requests per second in real-world environments. Notable features include:

- High speed and reliability with Async Rust
- Native support for HTTP/1 and HTTP/2
- TLS (OpenSSL, BoringSSL, rustls (Experimental))
- gRPC and WebSocket proxying
- Graceful Reload (no-downtime restarts)
- Customizable load balancing and failover strategies
- Comprehensive observability tool support

Pingora (GitHub): https://github.com/cloudflare/pingora

## Check Out the Validators DAO Official Discord for the Latest Updates

More details about this release, ongoing updates, and future roadmaps can be found on the Validators DAO official Discord. We welcome any questions or feedback regarding ERPC—feel free to join our community!

Validators DAO Official Discord: https://discord.gg/C7ZQSrCkYR

We remain committed to further advancing the Solana ecosystem, continuing our work on ERPC and other technological developments and operations. Stay tuned for more updates!
