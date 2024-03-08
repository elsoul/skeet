---
'@skeet-framework/cli': patch
---

Update - skeet db dev

Run `skeet db dev` to generate the prisma schema and types for the selected databases and generate the migration files if needed.

```bash
$ skeet db migrate
? Select Database (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◉ card-db
 ◯ point-db
 ◯ staking-db
 ✔ Converted prisma.schema to Common Type - ./common/sql/card-db/prismaSchema.ts 🎉
```
