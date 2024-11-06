---
id: general-getting-started
title: Getting Started
description: Skeet - TypeScript Serverless Framework. The Complete Web Framework for Modern Developers.
---

![Skeet](https://storage.skeet.dev/ogp.jpg)

## The Complete Web Framework for Modern Developers

In Skeet v3, we have eliminated cold starts, a common issue with serverless architectures, and introduced support for edge runtimes. This transformation makes Skeet optimized for modern web development, bringing an edge-native architecture.

🚧 Currently, the Skeet development team is actively focusing on v3, with rapid progress being made.

For the latest updates, please join our official Discord community:

https://discord.gg/H2HeqRq54J

For documentation on versions running on Firebase (v1 and v2), please refer to the following links:

Skeet v1 Documentation: https://skeet.dev/en/v1doc/general/overall-architecture

Skeet v2 Documentation: https://skeet.dev/en/v2doc/general/overall-architecture

## RC

Skeet v3 Edge Runtime Next.js: https://github.com/elsoul/skeet-v3-next-edge-rc

Skeet v3 SSG Next.js: https://github.com/elsoul/skeet-v3-next-ssg-rc

Skeet v3 Solana dApp: https://github.com/elsoul/skeet-v3-solana-dapp-rc

## We go with Deno.

![We go with Deno](https://storage.skeet.dev/WeGoWithDeno.jpg)

Deno, with its motto “Uncomplicate JavaScript,” offers developers a simple yet high-performance development environment. Not only is it easy to set up, but the new Deno performs nearly twice as fast as Node.js as a web server, delivering a more comfortable and faster development experience. This performance boost is achieved by utilizing the latest V8 engine and Rust technology to build a TypeScript-native runtime, drawing on the extensive knowledge of Node.js. Deno is designed with real JavaScript use cases in mind and complies with web standards, supporting a stable development environment with a standard library developed over four years.

![Why Deno](https://storage.skeet.dev/WhyDeno.jpg)

In the Skeet development team’s initial testing, simply migrating a `pnpm` project to Deno improved development server startup speed, operational speed, CI/CD processing, and drastically reduced build times.

Deno natively supports TypeScript and comes with essential tools for modern development, including a linter, formatter, and testing tools, all available out-of-the-box with zero configuration. In traditional Node.js projects, adding TypeScript, linters, formatters, and testing tools requires numerous modules and fine-tuning, leading to an increase in dependencies and node_modules size, which can complicate the project and slow down development.

![Deno Performance](https://storage.skeet.dev/DenoPerformance.jpg)

Deno addresses these challenges one by one, providing an ideal environment that allows developers to focus solely on coding. For more details, please refer to the official Deno v2.0 blog.

Deno v2.0: https://deno.com/blog/v2.0

## Feel the True Deno Experience

![Skeet Deno Fresh](https://storage.skeet.dev/ogpFresh.jpg)

While traditional npm projects also work seamlessly with Deno, to unlock the true performance of an edge-native environment, a Deno-native module structure is essential. Currently, Next.js heavily relies on npm, specifically on `package.json`, `tsconfig`, and React Compiler, making it challenging to achieve a Deno-native structure.

This is where “Fresh,” a Deno frontend framework providing a development experience similar to Next.js’s App Routing, comes into play.

Deno Fresh: https://fresh.deno.dev/

In Next.js, server startup takes a few seconds (although much faster than before), but with Fresh, the development server starts instantly upon executing the command, ready to use. This speed offers a new revelation for frontend developers. It’s like running a "Hello World" for a web API server, offering an instant start to the development environment.

Please compare the Next.js-based and Fresh-based versions for yourself. You can experience the difference through the following repository:

Skeet v3 Edge Deno Fresh: https://github.com/elsoul/skeet-v3-fresh-edge-web-rc

The Skeet v3 team continues to work daily to deliver these significant improvements in an intuitive and user-friendly way. Our main focus currently is on the development toolchain and creating a Deno-native Web3 development environment, primarily for Solana.

We welcome your feedback, so please feel free to join our Discord server!

Official Discord: https://discord.gg/H2HeqRq54J
