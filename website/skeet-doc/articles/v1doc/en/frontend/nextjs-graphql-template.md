---
id: nextjs-graphql-template
title: Next.js (React) + GraphQL Template
description: Skeet Framework App Template with Next.js (React) and GraphQL
---

![Skeet Next.js + GraphQL Template](https://storage.googleapis.com/skeet-assets/imgs/frontend/skeet-next-graphql.png)

## Skeet App Next.js (React) + GraphQL Template

Next.js (React) + GraphQL App Environment for Skeet Framework

[GitHub - Skeet App Next.js + GraphQL Template](https://github.com/elsoul/skeet-graphql)

## Aiming to

- Fast Development
- High Performance
- Global Scale
- Maintainable Code
- Strong SEO

## Summary

- [x] [Next.js - SSG Framework](https://nextjs.org/)
- [x] [React - UI Framework](https://reactjs.org/)
- [x] [TypeScript - Type Check](https://www.typescriptlang.org/)
- [x] [ESLint - Linter](https://eslint.org/)
- [x] [Prettier - Formatter](https://prettier.io/)
- [x] [Recoil - State Management](https://recoiljs.org/)
- [x] [Next i18next - i18n Translation](https://github.com/isaachinman/next-i18next)
- [x] [Firebase](https://firebase.google.com/)
- [x] [Tailwind - CSS Framework](https://tailwindcss.com/)
- [x] [Relay - GraphQL Client](https://relay.dev/)

## Dependencies

- [Watchman (for creating GraphQL Types automatically)](https://facebook.github.io/watchman/docs/install)

## Usage

```bash
$ npm i -g firebase-tools
$ npm i -g @skeet-framework/cli
```

```bash
$ skeet create <project-name>
```

```bash
$ cd <project-name>
$ skeet s
```

**※ You need OpenAI API key to use ChatGPT.**

_./functions/skeet/.secret.local_
or
_./functions/skeet/.env_

```bash
CHAT_GPT_KEY=your-key
CHAT_GPT_ORG=your-org
```

Test your app:

```bash
$ skeet test
```

Open Firebase Emulator: http://localhost:4000

Open Front-end App: http://localhost:4200
