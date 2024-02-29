---
id: general-about-v3
title: About Ver.3 (Soon)
description: About Skeet Ver.3 (Soon)
---

The update to Skeet Ver.2 primarily made the following improvements:

- Introduction of pnpm: Achieved more efficient package management in monorepos and multiple projects. Saves disk space and realizes fast package installation. Also significantly reduced build time in GitHub Actions by effectively utilizing cache.
- Introduction of vitest: Updated the test package to vitest. This more performant test runner can also start as a daemon to execute tests whenever changes are detected, further improving development efficiency.
- Introduction of Changesets: Previously, various modules of Skeet were managed in separate repositories, but have now transitioned to management within a monorepo. The release of packages now incorporates Changesets, which automatically detect changes in each package, modify versions, create Changelogs, and generate release notes among various automations.
- Introduction of SQL Template (Hono Web Server) Scaffold: Automatically routes using the Hono Web Server from models created (described) with Prisma, generating CRUD APIs. These are immediately deployable. This significantly shortened the time from designing relational databases (SQL) to publishing API servers.
- Support for Firebase callable functions: Creating functions callable only from our Firebase app without exposing HTTPS endpoints enhances security.

# About Skeet Ver.3

Skeet Ver.3 aims to further improve development efficiency with the following enhancements:

## Monorepo Transition and More Optimal Modularization of Each Template

While Skeet's public NPM modules have completed the transition to a monorepo, the initial app templates of Skeet (Skeet Next.js + Firestore or Expo + Firestore) are still managed in separate repositories. These templates will also transition to a monorepo, achieving more efficient modularization and improving development efficiency and quality.

Currently, templates heavily depend on the form of the frontend, but modularization will enable more flexible template customization.

```
├── src
│   ├── Frontend codes
├── functions
│   ├── functionsA
│   └── functionsB
├── sql
│   ├── sqlA
│   └── sqlB
├── common
│   ├── enums
│   ├── lib
│   ├── models
│   └── types
├── package.json
├── skeet-cloud.config.json
└── firebase.json
...
```

The new Skeet app monorepo structure is planned to be as follows:

```
├── webapp
│   ├── webappA
│   └── webappB
├── mobile
│   ├── mobileA
│   └── mobileB
├── functions
│   ├── functionsA
│   └── functionsB
├── sql
│   ├── sqlA
│   └── sqlB
├── common
│   ├── enums
│   ├── lib
│   ├── models
│   └── types
├── package.json
├── skeet-cloud.config.json
└── firebase.json
...
```

This allows Skeet to flexibly construct projects, from simple scheduler functions to large-scale projects with web apps, documentation sites, and mobile apps.

The web app template will provide a variety of templates, including SSR-compatible admin panels and web service templates using Next.js, SSG (Static Site Generation) templates for documentation sites, and templates for developing Web3 apps using the Solana blockchain.

For mobile, Expo will be used to provide templates for iOS/Android app development for Web2 and Web3 templates compatible with the Solana Mobile Stack.

## Sharing of .env File Groups

While Firebase Functions secrets are automatically shared, handling SQL Web API templates required sharing of .env file groups (not shared through git due to being gitignored). Skeet Ver.3 will add a feature to automatically share these .env file groups if not present locally, utilizing Google Cloud IAM and GitHub account permissions for secure sharing.

## Enhancement of Frontend Tools

Skeet Ver.3 will introduce the following tools to improve frontend development efficiency:

### Introduction of Next.js App Router

Approximately one and a half years after the debut of Next.js's App Router (October 2022), the environment has matured significantly with comprehensive documentation and support for surrounding technologies. We are now introducing this App Router to Skeet.

The evolution from the previous pages-based routing allows for a reduction in code quantity by allocating roles based on file names. For example, the presence of an error.tsx file automatically recognizes it as a component for error handling, switching the display automatically. This reduces the need for nested code (increasing code quantity and worsening readability) for such purposes.

Previously, necessary components were scattered across various folders, but with App Router, dependent files can be organized closely together, improving code maintainability and development efficiency.

https://nextjs.org/docs/app/building-your-application/routing/defining-routes

### Both SSR and SSG Templates Support

Skeet Ver.3 will provide both SSR (Server-Side Rendering) and SSG (Static Site Generation) + CSR (Client-Side Rendering) compatible templates, allowing for more flexible web application development.

The role of the frontend is increasingly important, making SSR essential for performance improvement.

A brief explanation of why SSR improves performance is provided below.

**CSR (Client-Side Rendering) Process**

1. The browser requests HTML, which at this point does not contain data.
2. The browser downloads and executes JavaScript, which takes time.
3. JavaScript makes another request to the server or API to fetch data, which is then sent to the browser.
4. The browser renders the page based on the received data.

This process requires additional time to fetch data, delaying the time it takes for users to see content.

**SSR (Server-Side Rendering) Process**

1. The server receives the request and fetches the necessary data, accessing data sources directly for efficient data fetching.
2. The server generates and renders HTML based on the data, which already contains the content.
3. The generated HTML is sent to the browser, which can display it directly.
4. SSR eliminates the need for the browser to make additional requests to fetch data, significantly reducing the time for users to see the first page. Since the server performs data fetching, it is less affected by client device performance or network conditions.

While SSR previously required resource management and incurred management costs, Skeet Ver.3 will automatically manage resources serverlessly, with automatic connections to Cloud Run or load balancers by Skeet.

On the other hand, SSG is more efficient when there's no need to display different content to users. Simple hosting can be used, providing fast pages at minimal cost. Documentation sites and blog sites are well-suited for this configuration.

### Multi-Language Support with next-intl

With the introduction of App Router, the method for multi-language support will change, but next-intl appears user-friendly. Skeet will handle the setup, ensuring ease of use.

Specifically, the current multi-language support requires preparing two files inside and outside the `[locale]` folder with the Page router, but with App Router, adding a single file within the `(locale)` folder suffices.

https://next-intl-docs.vercel.app/

### Global State Management with Jotai

Currently, Recoil is used for global state management, but we will transition to Jotai, which operates on the same concept but is lighter and faster.

As of February 28, 2024, Recoil's last release was v0.7.7 in April 2023, while Jotai released v2.7.0 on February 27, 2024, indicating active development.

Recoil's development appears to have stopped, but Jotai's development is very active. The Meta company logo displayed on Jotai suggests it is effectively the successor to Recoil.

The usability, especially regarding state reset, is expected to improve, facilitating easy migration.

https://jotai.org/

### Client-Side Data Fetching Management with SWR

To unify the approach to data fetching (error handling, loading handling) and reduce code quantity, SWR will be introduced. Its advanced caching features also minimize data re-fetching. It can accommodate multiple data sources by preparing corresponding wrappers.

Used in conjunction with App Router, SWR enables more comprehensive and flexible error handling with less code, ultimately improving application quality.

https://swr.vercel.app/

### Introduction of shadcn UI

shadcn UI is an open-source UI library that extends Tailwind CSS.

While Tailwind CSS allows for flexible component descriptions and is user-friendly, starting from scratch requires additional effort, making it challenging to quickly start projects. shadcn UI resolves this issue, enabling more efficient development.

The code can be copied and used directly, and since it is based on Tailwind, familiar methods can easily customize it. Customizing copied code and adding className to components themselves for customization are flexible.

https://ui.shadcn.com/

### Compatibility with Expo Router

Expo, a framework for React Native, simplifies development with React Native tools.

It allows for mobile app development with React, the same technology used for web app development, facilitating simultaneous web and mobile app development.

However, the lack of a high-performance router like Next.js's App Router previously led to increased code quantity, scattered layout code, and poor code visibility.

Expo Router v3 can be used similarly to Next.js's App Router, reducing code quantity and organizing related code to advance development.

https://docs.expo.dev/router/introduction/

## Development Team Discord

The Skeet development team is committed to quality improvement and actively discusses on Discord.

If you have any questions or comments, please join us on Discord.

https://discord.com/invite/H2HeqRq54J
