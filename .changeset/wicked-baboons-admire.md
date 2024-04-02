---
'@skeet-framework/skeet-func-template': patch
'@skeet-framework/base-template': patch
'@skeet-framework/base-sql': patch
'@skeet-framework/cli': patch
---

## Update - skeet init

skeet init now supports auto configuration of Google Cloud/Firebase Project step by step.
This reads the `skeet-cloud.config.json` file and configure the project depending on the cloud status.

```bash
$ skeet init
```
