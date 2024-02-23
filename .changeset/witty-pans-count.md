---
'@skeet-framework/cli': patch
---

## Update - skeet db/run cmd

Now you can select multiple databases/packages to run the command on.

- skeet db command

e.g.

```bash
skeet db migrate
? Select Database (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ card-db
 ◯ point-db
 ◯ staking-db
```

- skeet run command

e.g.

```bash
skeet run
? Package Name to Run Cmd: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ staking-db
 ◯ point-db
 ◯ skeet-func
 ◯ webapp
```
