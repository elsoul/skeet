---
id: skeet-upgrades-to-nextjs-v14
title: Full-Stack Serverless Framework 'Skeet' Upgrades to Next.js v14
category: Press Release
thumbnail: /news/2023/10/28/SkeetNextjs14.png
---

ELSOUL LABO B.V. (CEO: Fumitake Kawasaki, Headquarters: Amsterdam, Netherlands, hereinafter referred to as 'ELSOUL LABO') announced that the open-source full-stack serverless app development tool Skeet has upgraded its Web frontend to Next.js v14.

This upgrade enables Skeet to develop applications more efficiently and effectively by leveraging the improvements in Next.js v14, enhancing performance.

Next.js 14 Release Notes: https://nextjs.org/blog/next-14

## Accelerated Development Environment

The Rust-based Turbopack greatly contributes to performance tuning in Skeet projects. Rust is a high-performance and safety-oriented programming language, and Turbopack improves the local server startup speed by 53% and code refresh speed by 94% through Fast Refresh, significantly boosting development efficiency.

## Continued Adoption of Page Router

Skeet continues to adopt the historic routing technology of Next.js, the Page Router. Page Router is a mature technology, easily supported by peripheral technologies. Meanwhile, we are also paying attention to the new App Router technology and considering transitioning when peripheral technologies become enriched. At this point, Page Router is more stable, hence adopted in Skeet projects.

## Starting with Static Site Generation (SSG)

Skeet is configured to start with Static Site Generation (SSG) instead of Server-Side Rendering (SSR) in initial projects, due to cost benefits. SSG enables pre-generation of static content, achieving fast page load speeds and improved SEO, while SSR generates dynamic content as needed, allowing applications to handle real-time data. Transitioning to SSR is made easy when necessitated, aligning with the philosophy of Next.js.

Furthermore, Skeet allows for phased transitions in all aspects, making it possible to adopt Vercel for frontend infrastructure while observing the situation.

Details: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

## Open-source Skeet Framework for Rapid Serverless App Development on Google Cloud, Firebase

![Skeet Serverless Framework](/news/2023/10/28/SkeetEN.png)

Skeet is an open-source TypeScript serverless framework that allows building full-stack apps on GCP (Google Cloud) and Firebase.

With Skeet, you can rapidly develop everything from API servers to Web, iOS, and Android apps using TypeScript. TypeScript provides static typing, helping to catch errors early, and improving code quality and maintainability. Moreover, Skeet actively adopts modern technologies like GraphQL and Firestore, offering an excellent development experience to developers. It also simplifies the development of applications utilizing AI such as ChatGPT and Vertex AI, as well as Web3 dApp development leveraging blockchain technologies like Solana.

You can try the demo from the link below. You can also simultaneously try PaLM2, Vertex AI, and Open AI's ChatGPT (GPT-3.5, GPT-4) to compare and consider which one has what features.

Skeet Demo: https://skeeter.dev/en/

Additionally, this demo app can be run on your own PC environment or cloud environment in 5 minutes using Skeet CLI.

First, get an image of what you can do with the demo, and then you can start app development right away with Skeet CLI. Skeet CLI is also equipped with AI, and the powerful support such as code generation through chat significantly improves developer productivity.

Skeet CLI (GitHub): https://github.com/elsoul/skeet-cli

Skeet is developed as open-source to reduce development and maintenance costs in application development sites worldwide, and to improve the developer experience.

For more information, please see the official documentation.

Skeet Documentation: https://skeet.dev/en/
