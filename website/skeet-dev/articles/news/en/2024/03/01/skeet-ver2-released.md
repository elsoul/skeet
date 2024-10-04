---
id: skeet-ver2-released
title: Open Source TypeScript Serverless Framework Skeet Ver.2 Released
category: Press Release
thumbnail: /news/2024/03/01/SkeetVer2Released.jpg
---

ELSOUL LABO B.V. (Headquartered in Amsterdam, Netherlands, CEO Fumitake Kawasaki) is proud to announce the release of Ver.2 of the open-source TypeScript serverless app development tool, Skeet.

The new version introduces a more refined architecture for easier management, facilitates test-driven development, and achieves higher security through the use of callable functions from Firebase.

It also features a Scaffold functionality that instantly generates Web API code from data models, significantly improving the productivity of Skeet developers.

## Main Updates in Skeet Ver.2

The update to Skeet Ver.2 includes the following improvements:

### Introduction of pnpm

The introduction of pnpm revolutionizes package management for large projects and monorepos. Saving disk space and speeding up package installation directly accelerate the development cycle. Utilization of caches through integration with GitHub Actions contributes to the efficiency of CI/CD pipelines, while reducing build times enhances project agility.

https://pnpm.io/

### Introduction of vitest

The update to vitest encourages the adoption of test-driven development (TDD) and strengthens the quality assurance process. The introduction of daemon mode, which runs tests immediately upon detecting changes, allows developers to quickly receive feedback on code modifications, promoting early bug detection and resolution.

https://vitest.dev/

### Introduction of Changesets

Transitioning to a monorepo and introducing Changesets offer significant advantages in automating version management and release processes. This allows for efficient management of dependencies across multiple packages, enhancing the transparency and traceability of projects through automated changelog generation and release notes creation.

https://github.com/changesets/changesets

### Introduction of SQL Template (Hono Web Server) Scaffold

Automatic generation of CRUD APIs through Hono Web Server using Prisma model definitions contributes to the rapid development of applications. This approach simplifies the process from data modeling to API endpoint implementation, allowing developers to focus more on business logic.

https://hono.dev/

### Support for Firebase Functions Callable

By utilizing callable functions from Firebase Functions, functions can be created that are callable only from within your Firebase app, without exposing https endpoints. This significantly enhances security.

https://firebase.google.com/docs/functions/callable?gen=2nd

## Skeet - TypeScript Serverless Framework

![Skeet - TypeScript Serverless Framework](/news/2024/03/01/SkeetV2EN.jpg)

Skeet is an open-source serverless app development tool using TypeScript, featuring:

- **Elimination of Infrastructure Design and Management:** Reduces the preparation and worry about infrastructure, providing an environment where developers can focus on application logic.
  Rapid Application Development: Achieves a fast development cycle, making service operation possible even for small teams.
- **Just What You Need, When You Need It:** Quickly develop everything from API servers to Web, iOS, and Android apps, with just what you need.
- **Comprehensive AI Support:** Not only is AI integration into the apps you develop included, but Skeet's tools themselves are also embedded with AI support, allowing you to start app development before fully mastering the framework.
- **Support for dApps, Web3 Apps**: Designed as a modular and extendable modern application framework, it supports the development of applications using blockchain technology.

For more information, please visit the official documentation. Also, in the official Discord community, Skeet developers gather to share the latest information and discuss daily. Please join us.

Skeet Official Documentation: https://skeet.dev/en/

Discord Community: https://discord.com/invite/H2HeqRq54J
