---
id: general-overall-architecture
title: Overall Architecture
description: Overall Architecture for the development of Skeet, an open-source serverless app framework
---

## Overall Architecture Diagram

![Skeet Architecture](https://storage.googleapis.com/skeet-assets/imgs/v2/SkeetArchitectureV2.jpg)

Skeet is an open-source serverless application development framework created with TypeScript.

It allows the selection and utilization of necessary features according to the project requirements. Some projects may only need to use Firebase Functions combined with WebAPI. For instance, by using the Discord API, it's possible to omit frontend development and focus on functionality.

As needed, web frontends, mobile apps, or Web API servers can be implemented later, and as data accumulates, sophisticated analysis with BigQuery becomes feasible. Furthermore, templates for blockchain wallet compatibility are available, making the development of Web3 apps and dApps immediate.

With full support for cloud architecture construction by Skeet CLI, developers can concentrate on application development. Skeet CLI also boasts features like scaffolding and file sharing between frontend and backend, significantly reducing the time needed for feature implementation. Support includes over 80 languages for translation file generation (producing md or json files for app use), Prisma schema file generation, code file creation tailored to Firebase Functions routing (http, pub/sub, scheduler, etc.), and automatic generation of TypeDoc to enhance code maintainability, all supported by generative AI.

Most features auto-scale, eliminating the need for developers to handle complex usage predictions or load and resource management. Furthermore, Skeet CLI supports everything from application deployment to management, sparing developers from spending time on infrastructure setup and maintenance. With pay-as-you-go pricing, developers only use the resources they need, minimizing costs.

Native support for GitHub Actions ensures a project can begin with a ready-to-go CI/CD environment.

For enhanced security, the setup of load balancers and application protection using Cloud Armor is easily achievable.

Currently, Skeet supports application development utilizing the serverless architectures of GCP (Google Cloud) and Firebase.
