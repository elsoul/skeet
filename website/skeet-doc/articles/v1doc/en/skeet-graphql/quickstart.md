---
id: backend-quickstart
title: Quick Start - GraphQL
description: A simple guide to getting started with the Skeet framework.
---

This guide will help you quickly get started with the Skeet framework.

![skeet-prisma](https://storage.googleapis.com/skeet-assets/animation/skeet-prisma.gif)

## Installing Skeet CLI

Skeet CLI is a command line tool for efficiently using the Skeet framework. You can install it with the following command.
If npm is already installed, you can install it with the following command.

```bash
$ npm i -g @skeet-framework/cli
```

If npm is not installed, you can install it with the following command.
(This command installs nodenv, node, npm, @skeet-framework/cli and edits .profile/.zshrc.)

```bash
$ sh -c "$(curl -sSfL https://storage.googleapis.com/skeet-assets/resources/v1.0.2-install)"
```

## Docker Installation

Skeet supports local development using Docker.
If Docker is not installed, please refer to the following for installation.

- [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Docker Desktop for Linux](https://docs.docker.com/engine/install/)

## Creating a Google Cloud Project

By creating a Google Cloud Project, you can utilize various resources of Google Cloud. Refer to the official Google Cloud documentation to create a new project:

- [Creating a Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

## Enabling Google Cloud VertexAI

Skeet is integrated with Google Cloud VertexAI. Use the following command to enable VertexAI:

```bash
$ skeet iam ai
```

## Launching Skeet AI Assistant

The Skeet AI Assistant is an interactive tool designed to handle various queries:

```bash
$ skeet ai
```

Upon launching, you'll see a prompt like the one below. Try asking it something:

````
VertexAI is selected 🤖 (type "q" to quit)

You: How to install skeet?
Skeet:
To install Skeet, you can use the following command:

```bash
$ npm install -g @skeet-framework/cli
```

This will install the Skeet CLI tool globally on your machine.

You:

````

## Launching Skeet AI Prisma

While _skeet ai_ is running, entering _$ prisma_ will switch to database schema generation mode. Upon launching, you'll be prompted to describe your database use case. For instance, try entering, "I want to create a blog site."

```bash
$ skeet ai
VertexAI is selected 🤖 (type "q" to quit)

You: $ prisma
🤖 Prisma Scheme Generating Mode 🤖
Please describe your Database use case.

You: I want to create a blog site.
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Comment   Comment[]
  User      User      @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  postId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Post      Post     @relation(fields: [postId], references: [id])
}

Edit: ./graphql/prisma/schema.prisma
```

A Prisma schema has been generated.

## Editing Prisma Schema

The Prisma schema is saved in _./graphql/prisma/schema.prisma_. Edit the schema outputted earlier as required.

If you haven't used the skeet template yet, create it with the following command:

```bash
$ skeet create <appName>
```

Use this schema to migrate your database.

## Creating/Running DB Migration

With Skeet, you can perform database migrations using Prisma:

```bash
$ skeet db migrate <migrationName>
```

Your database migration is now complete.

## Creating GraphQL API

Skeet can automatically generate a GraphQL API from the schema:

```bash
$ skeet g scaffold
```

## Launching the GraphQL API

Skeet allows you to run the GraphQL API locally:

```bash
$ skeet s
```

You can access the GraphQL API at:

- [http://localhost:3000/graphql](http://localhost:3000/graphql)

## Synchronizing Types

Skeet can automatically generate TypeScript type definitions from the GraphQL API:

```bash
$ skeet sync types
```
