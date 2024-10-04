---
  id: skeet-cli-sync
  title: Skeet Sync Command
  description: skeet sync command
---

Skeet Sync Command

Skeet Sync Command is a command to sync the latest model definitions to other backend packages and frontend packages.

```bash
$ skeet sync
Usage: skeet sync [options] [command]

Skeet Sync Comannd to sync backend and frontend

Options:
  -h, --help      display help for command

Commands:
  models          Skeet Sync Models
  types           Skeet Sync Types
  routings        Skeet Sync Routings
  armors          Skeet Sync Cloud Armor Rules
  help [command]  display help for command
```

## Skeet Sync Models

Copy the latest model definitions to the backend packages and frontend packages.

```bash
$ skeet sync models
```

Copy the types of the HTTP Instances to frontend packages.

## Skeet Sync Types

```bash
$ skeet sync types
```

Create routings for the HTTP Instances.

## Skeet Sync Routings

```bash
$ skeet sync routings
```

_skeet-cloud.config.json_ is a file that defines the rules for accessing the Cloud Functions.

## Skeet Sync Armor

```bash
$ skeet sync armors
```
