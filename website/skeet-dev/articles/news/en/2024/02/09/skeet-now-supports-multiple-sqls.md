---
id: skeet-now-supports-multiple-sqls
title: Open-Source TypeScript Serverless Framework Skeet Now Supports Multiple SQL Database Configurations
category: Press Release
thumbnail: /news/2024/02/09/SkeetMultipleSQLs.jpg
---

ELSOUL LABO B.V. (based in Amsterdam, Netherlands, CEO Fumitake Kawasaki) has announced the addition of a new feature to Skeet, its open-source TypeScript serverless application development tool, that supports configurations for multiple SQL databases.

This enhancement enables developers to centrally manage various SQL databases and focus on application logic while selecting the appropriate cloud infrastructure during the application development process.

Using Skeet, developers can choose the optimal database solution and API according to the requirements of their project, enabling efficient and flexible data management.

## Build Applications with Multiple SQL Databases + API Servers

![Skeet - TypeScript Serverless Framework](/news/2024/02/09/SkeetAddSQL.png)

Skeet now allows for the integration and management of multiple SQL databases within a single project. This new feature enables developers to easily combine multiple databases and efficiently distribute data load throughout the application development process, resulting in energy-efficient and manageable project progress.

Traditionally, managing data with different life cycles in a single database or API server tends to complicate management and increase the likelihood of errors. However, with Skeet, it is possible to select the most suitable database for the data's characteristics and life cycle, and manage data with high relevance separately. This approach improves management and development efficiency, enhancing the quality of the project.

Furthermore, under Skeet's management, all these data can be interconnected through HTTPS APIs and are compatible with Firestore integration. This facilitates flexible data design and the implementation of various measures. For blockchain-based application development, this allows for efficient off-chain data processing, making it easy to implement functions like Indexers. Setting up SQL databases and API servers individually greatly enhances development flexibility and scalability.

With this new feature in Skeet, developers can build more advanced applications efficiently and with high quality. The ease of managing complex data structures and optimizing the use of cloud resources contributes to the overall reduction in development costs.

## Hono (Flame) - A Compact, Ultra-Fast Web Framework for the Edge

![Hono - Ultrafast Web Framework](/news/2024/02/09/Honojs.png)

To construct API servers compatible with each SQL database, we use Hono (Flame), a compact, ultra-fast web framework for the edge.

It is known for its simplicity, ease of coding, and excellent developer experience.

Written with TypeScript in mind, it enables development with robust type checking and editor completion features.

It boasts the following features:

- **Ultra-Fast:** The router operates at high speed without using linear loops.
- **Ultra-Lightweight:** The hono/tiny preset is less than 14KB in size, with no dependencies and purely utilizes Web Standard APIs.
- **Multi-Runtime:** It operates on any JavaScript runtime, such as Deno and Bun, as well as various FaaS, allowing code written once to be deployed anywhere.
- **Rich Middleware:** A wide range of middleware necessary for regular Web API development is available, making it easy for developers to use.
- **Excellent Developer Experience:** Offers first-class TypeScript support and very user-friendly APIs, enabling rapid development.

Hono official documentation: https://hono.dev/

APIs built with Hono can be easily deployed and managed on the cloud via Skeet. They are connected to the Google Cloud Load Balancer by default, enabling secure access over HTTPS.

## Skeet - TypeScript Serverless Framework

![Skeet - TypeScript Serverless Framework](/news/2024/02/09/skeetEN.jpg)

Skeet is an open-source serverless application development tool using TypeScript, featuring:

- **Simplified Infrastructure Design and Management:** Reduces the preparation and concerns about infrastructure, allowing developers to focus on application logic.
- **Rapid Application Development:** Enables a fast development cycle, allowing small teams to operate services.
- **Only What You Need, When You Need It:** From API servers to Web, iOS, and Android apps, develop quickly only what is necessary.
- **Enhanced AI Support:** Integration of AI into developed apps, as well as AI support built into Skeet's tools, allows starting app development even before fully mastering the framework.
- **dApps and Web3 App Support:** Supports blockchain-based application development, designed as a modular and extendable modern application framework.

For more details, please see the official documentation. Also, join our official Discord community, where Skeet developers gather to share the latest information and discuss daily.

Skeet official documentation: https://skeet.dev/en/

Discord Community: https://discord.com/invite/H2HeqRq54J
