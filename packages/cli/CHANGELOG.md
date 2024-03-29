# @skeet-framework/cli

## 2.2.8

### Patch Changes

- [`3b0ea95`](https://github.com/elsoul/skeet/commit/3b0ea95441762c67c2f557f85e0febfe61e4bbc4) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet deploy

  ```bash
  $ skeet deploy
  ? Select Services to run functions command (Press <space> to select, <a> to
  toggle all, <i> to invert selection, and <enter> to proceed)
    = Services =
  ❯◯ skeet-func
  ```

## 2.2.7

### Patch Changes

- [`8c71527`](https://github.com/elsoul/skeet/commit/8c71527234e35e2d034741af132c2cbadbcc27fe) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update template

- [`b37c5b4`](https://github.com/elsoul/skeet/commit/b37c5b49017a8d285842d87e6f5095ec8bd4cb14) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Package update

- Updated dependencies [[`b37c5b4`](https://github.com/elsoul/skeet/commit/b37c5b49017a8d285842d87e6f5095ec8bd4cb14)]:
  - @skeet-framework/utils@1.3.9
  - @skeet-framework/ai@1.8.6

## 2.2.6

### Patch Changes

- [#376](https://github.com/elsoul/skeet/pull/376) [`921d1dd`](https://github.com/elsoul/skeet/commit/921d1dde9adf9edce07990b88c95547c03cbf2f3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update firebase secret management

  ## Add/Update Firebase Secret

  ```bash
  $ skeet add secret
  ```

  ## View Firebase Secret

  ```bash
  $ skeet get secret
  ```

  ## Remove Firebase Secret

  ```bash
  $ skeet delete secret
  ```

  ## Prune Unused Firebase Secrets

  ```bash
  $ skeet delete secret --prune
  ```

  Please note that this will delete all secrets that are not being used by any of your firebase functions.
  ※ Please delete the secret from the `./skeet-cloud.config.json` file as well.

## 2.2.5

### Patch Changes

- [#373](https://github.com/elsoul/skeet/pull/373) [`16b9fa0`](https://github.com/elsoul/skeet/commit/16b9fa024337261fa9238a93d48f851de9de9efa) Thanks [@KishiTheMechanic](https://github.com/KishiTheMechanic)! - Fix things

## 2.2.4

### Patch Changes

- [#372](https://github.com/elsoul/skeet/pull/372) [`0343da7`](https://github.com/elsoul/skeet/commit/0343da721d24aecee848502009ed70fe612ba8f1) Thanks [@KishiTheMechanic](https://github.com/KishiTheMechanic)! - Fix sync routings

## 2.2.3

### Patch Changes

- [#367](https://github.com/elsoul/skeet/pull/367) [`a1ce123`](https://github.com/elsoul/skeet/commit/a1ce12333ef9b67f995182822320cd6c21b513dc) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update execAsncCmd

## 2.2.2

### Patch Changes

- [#365](https://github.com/elsoul/skeet/pull/365) [`ab06bd2`](https://github.com/elsoul/skeet/commit/ab06bd2fdee626d86e4f103cc7299684bd2c45ff) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet sync routings fix #362

  ```bash
  $ skeet sync routings
  ```

## 2.2.1

### Patch Changes

- [#360](https://github.com/elsoul/skeet/pull/360) [`882aeb7`](https://github.com/elsoul/skeet/commit/882aeb79b82832c0367ee091d8bfad872936eb4d) Thanks [@KishiTheMechanic](https://github.com/KishiTheMechanic)! - somehow version unchange

## 2.2.0

### Minor Changes

- Fixed Sync Routings

## 2.1.6

### Patch Changes

- [#356](https://github.com/elsoul/skeet/pull/356) [`a63f464`](https://github.com/elsoul/skeet/commit/a63f4646b04a6e83c3bc34645ab1a0a6cf0b9a35) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - skeet sync armor

## 2.1.5

### Patch Changes

- [#354](https://github.com/elsoul/skeet/pull/354) [`40741b3`](https://github.com/elsoul/skeet/commit/40741b3fa8d0e5ef440aec41f5b204458afada7e) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet sync armor

## 2.1.4

### Patch Changes

- [#352](https://github.com/elsoul/skeet/pull/352) [`57bcacc`](https://github.com/elsoul/skeet/commit/57bcaccc896710036b08357fabf06e1c6ba4bb18) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet add sql

## 2.1.3

### Patch Changes

- Updated dependencies [[`a7037fa`](https://github.com/elsoul/skeet/commit/a7037faea90e1c0a6167817b68eab925fb5ec22b)]:
  - @skeet-framework/ai@1.8.5

## 2.1.2

### Patch Changes

- [`5392b4c`](https://github.com/elsoul/skeet/commit/5392b4c7992363f76c5b19bbc2684536a0b9598c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update skeet ai

- Updated dependencies [[`5392b4c`](https://github.com/elsoul/skeet/commit/5392b4c7992363f76c5b19bbc2684536a0b9598c)]:
  - @skeet-framework/ai@1.8.4

## 2.1.1

### Patch Changes

- [`cf308b2`](https://github.com/elsoul/skeet/commit/cf308b2c8e4d4b57c77706d27ce7058c5935ddd0) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet add sql

## 2.1.0

### Minor Changes

- [`3c2f157`](https://github.com/elsoul/skeet/commit/3c2f1578c53c9cc68655af01b8c1dd6af47c8188) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet add sql

## 2.0.19

### Patch Changes

- [#342](https://github.com/elsoul/skeet/pull/342) [`1c58530`](https://github.com/elsoul/skeet/commit/1c585305c965b878abfbe8cf2efb036bad523a5d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet db dev/migrate

## 2.0.18

### Patch Changes

- [#340](https://github.com/elsoul/skeet/pull/340) [`cb41a32`](https://github.com/elsoul/skeet/commit/cb41a32a01c98b438cb56c192fa5caea6b428ebf) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet add sql

## 2.0.17

### Patch Changes

- [#337](https://github.com/elsoul/skeet/pull/337) [`8b8b24b`](https://github.com/elsoul/skeet/commit/8b8b24bb98c77b485317076a52d14bf811b99df8) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Updated the base template and CLI to include the new AI module.

  Add - Claude3 AI to skeet ai

- Updated dependencies [[`8bad710`](https://github.com/elsoul/skeet/commit/8bad710f9ef620b2635ba3de650a4064a09a20b3)]:
  - @skeet-framework/ai@1.8.3

## 2.0.16

### Patch Changes

- [#335](https://github.com/elsoul/skeet/pull/335) [`560160e`](https://github.com/elsoul/skeet/commit/560160e9ec041e261a9ab9346d0a8759c92c55d2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet add functions

## 2.0.15

### Patch Changes

- [#331](https://github.com/elsoul/skeet/pull/331) [`1d75f0d`](https://github.com/elsoul/skeet/commit/1d75f0dd72ef0af366664186a7a59d1376f7da25) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update add functions

## 2.0.14

### Patch Changes

- [#327](https://github.com/elsoul/skeet/pull/327) [`64d017a`](https://github.com/elsoul/skeet/commit/64d017af139ad2f24b2e4377218338de0483933b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add - skeet new

  Added a new command to the cli to create a new project.
  This command will create skeet v3 projects.

## 2.0.13

### Patch Changes

- Updated dependencies [[`bc20ae4`](https://github.com/elsoul/skeet/commit/bc20ae49e336f46f3683645fe95b20df2b564f5b)]:
  - @skeet-framework/utils@1.3.8

## 2.0.12

### Patch Changes

- Updated dependencies [[`a2dca64`](https://github.com/elsoul/skeet/commit/a2dca640a214815b00dfae22dd0486a31e236a5a)]:
  - @skeet-framework/utils@1.3.7

## 2.0.11

### Patch Changes

- [#313](https://github.com/elsoul/skeet/pull/313) [`efad937`](https://github.com/elsoul/skeet/commit/efad937a1b75ff083ac23ea1f41fd9ae1431de8c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet ai

  ```bash
  $ skeet ai
  ╔═════════╤════════╗
  │ Option  │ Value  │
  ╟─────────┼────────╢
  │ AI Type │ Gemini │
  ╚═════════╧════════╝

  🤖 Skeet AI Mode
  Type `mode` to change AI mode 🤖


  Gemini is selected 🤖 (type 'q' to quit)


  ? What can I do for you?

  You: mode
  Skeet:
  ? 🤖 Select Mode (Use arrow keys)
  ❯ prisma
    typedoc
    firestore
    function
    method
  ```

  or directly call skeet ai mode with the option

  ```bash
  $ skeet ai --mode
  ? 🤖 Select Mode (Use arrow keys)
  ❯ prisma
    typedoc
    firestore
    function
    method
  ```

- Updated dependencies [[`efad937`](https://github.com/elsoul/skeet/commit/efad937a1b75ff083ac23ea1f41fd9ae1431de8c)]:
  - @skeet-framework/utils@1.3.6

## 2.0.10

### Patch Changes

- Updated dependencies [[`c70fa8f`](https://github.com/elsoul/skeet/commit/c70fa8f24321104f4cdfc82a4738ebf9fa6752c7)]:
  - @skeet-framework/ai@1.8.2

## 2.0.9

### Patch Changes

- [#305](https://github.com/elsoul/skeet/pull/305) [`cc18a61`](https://github.com/elsoul/skeet/commit/cc18a614aecd1ddfe2cd47146c95af522fa1af7f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - skeet db dev

  Run `skeet db dev` to generate the prisma schema and types for the selected databases and generate the migration files if needed.

  ```bash
  $ skeet db migrate
  ? Select Database (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  ❯◉ card-db
   ◯ point-db
   ◯ staking-db
   ✔ Converted prisma.schema to Common Type - ./common/sql/card-db/prismaSchema.ts 🎉
  ```

## 2.0.8

### Patch Changes

- Updated dependencies [[`1c1696c`](https://github.com/elsoul/skeet/commit/1c1696cc5c77b17434d87b4cf7119218d9f40c5a)]:
  - @skeet-framework/ai@1.8.1

## 2.0.7

### Patch Changes

- Updated dependencies [[`27bd640`](https://github.com/elsoul/skeet/commit/27bd64022d84b40a69c223a2c84e257fb75d6433)]:
  - @skeet-framework/utils@1.3.5
  - @skeet-framework/ai@1.8.0

## 2.0.6

### Patch Changes

- Updated dependencies [[`1139e36`](https://github.com/elsoul/skeet/commit/1139e36e3a8ab8723c8a5667703f9c02f101d887), [`c78d703`](https://github.com/elsoul/skeet/commit/c78d703df629649ac8d125b4c56ddb9c89f2592e)]:
  - @skeet-framework/ai@1.8.0
  - @skeet-framework/utils@1.3.4

## 2.0.5

### Patch Changes

- [#273](https://github.com/elsoul/skeet/pull/273) [`144d5fb`](https://github.com/elsoul/skeet/commit/144d5fb2f7271a3ae189fab2154a9b7b781a5f97) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - skeet g scaffold

## 2.0.4

### Patch Changes

- [#271](https://github.com/elsoul/skeet/pull/271) [`6416dfe`](https://github.com/elsoul/skeet/commit/6416dfe90b099b09186716ae85644634789f52d4) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - skeet g scaffold for SQL

## 2.0.3

### Patch Changes

- Updated dependencies [[`6cfcac7`](https://github.com/elsoul/skeet/commit/6cfcac72a5af8641234dfc35c4c5ea546dc54c6b)]:
  - @skeet-framework/utils@1.3.3
  - @skeet-framework/ai@1.7.13

## 2.0.2

### Patch Changes

- [`ce72bf5`](https://github.com/elsoul/skeet/commit/ce72bf536cf32fe02bd33b9abbf5d28148a8417c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update workflow

- Updated dependencies [[`ce72bf5`](https://github.com/elsoul/skeet/commit/ce72bf536cf32fe02bd33b9abbf5d28148a8417c)]:
  - @skeet-framework/utils@1.3.2

## 2.0.1

### Patch Changes

- Updated dependencies [[`1bf5431`](https://github.com/elsoul/skeet/commit/1bf5431e4ec44de7750309376caefade39cc4bb0)]:
  - @skeet-framework/utils@1.3.1

## 2.0.0

### Major Changes

- [`569169f`](https://github.com/elsoul/skeet/commit/569169fcf4be2ed9c4c40b3c9ce869d34dc8cbcf) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - cli

## 1.15.14

### Patch Changes

- [#255](https://github.com/elsoul/skeet/pull/255) [`2503741`](https://github.com/elsoul/skeet/commit/2503741f9695ab734b5db5b36f73d629b818c1a3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Update - skeet db/run cmd

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

- Updated dependencies [[`97534cc`](https://github.com/elsoul/skeet/commit/97534cc8bc043b76bd9d4708a5c1cb1af5f90811)]:
  - @skeet-framework/utils@1.3.0

## 1.15.13

### Patch Changes

- [#249](https://github.com/elsoul/skeet/pull/249) [`d93c17b`](https://github.com/elsoul/skeet/commit/d93c17bdfff4842bc7de9d9b123c351fa1308027) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Actions - add Discord/X Notifications

  Discord/X Notifications run on every release and will notify the Discord server of the release.

## 1.15.12

### Patch Changes

- [`c6ea14d`](https://github.com/elsoul/skeet/commit/c6ea14dba6dd439b8487e734de1046efd88656dc) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update release

## 1.15.11

### Patch Changes

- [`7b9ed61`](https://github.com/elsoul/skeet/commit/7b9ed6135bd2cf29ee873c12902d3febf9f5f58d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - patch

## 1.15.10

### Patch Changes

- [`0fbfcc7`](https://github.com/elsoul/skeet/commit/0fbfcc7285482a8ae38bca1262545dd07a0313b3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update

- [`6625206`](https://github.com/elsoul/skeet/commit/6625206bb2b520c1b470cab20e42862a5277d362) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update

- [`08f66c5`](https://github.com/elsoul/skeet/commit/08f66c5d49e8092b2dc78b423b1d57ce68b8df98) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update actions 5

- [`83d50ab`](https://github.com/elsoul/skeet/commit/83d50ab1ca86c63bef242c91f285d4fbe71134aa) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - migrate

## 1.15.9

### Patch Changes

- version

## 1.15.8

### Patch Changes

- [`79a3897`](https://github.com/elsoul/skeet/commit/79a38975bfbd893f75c3b5371e568714b3c9a730) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update in actions

## 1.15.7

### Patch Changes

- [`22fcadf`](https://github.com/elsoul/skeet/commit/22fcadf0a34f922274652ff1b1a680f3f278dd66) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update

## 1.15.9

### Patch Changes

- [`ecda956`](https://github.com/elsoul/skeet/commit/ecda956ff9fa437447207b40df5e021f42116788) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - migrate

## 1.15.8

### Patch Changes

- [`0fbcc25`](https://github.com/elsoul/skeet/commit/0fbcc2574c8703ae509d1c4a816549a39ed5c40c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - migrate release

## 1.15.9

### Patch Changes

- [`81c7240`](https://github.com/elsoul/skeet/commit/81c7240ce49a39142865b12bd75e5cc5d3a68e8f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - migrate

## 1.15.8

### Patch Changes

- [`14b921e`](https://github.com/elsoul/skeet/commit/14b921e1a3ab5239d8759793c04601eb4f6fbbc0) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update

## 1.15.7

### Patch Changes

- [`03634e6`](https://github.com/elsoul/skeet/commit/03634e68cad9a6dd80aa0841165b8806da9d4bec) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update

## 1.15.6

### Patch Changes

- [`30770f2`](https://github.com/elsoul/skeet/commit/30770f2104d026e69b0fcfc5fdd9b45ed06e4919) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - improve actions

## 1.15.5

### Patch Changes

- [`29073ca`](https://github.com/elsoul/skeet/commit/29073ca9ca839138f02587f75b3f3c3ec56db524) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - actions token

## 1.15.4

### Patch Changes

- [`b33b21b`](https://github.com/elsoul/skeet/commit/b33b21b852578d6c76130058aa04f7727b328d62) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - check release

## 1.15.3

### Patch Changes

- [`ba23f33`](https://github.com/elsoul/skeet/commit/ba23f33fc637f4e4de4651f3131e183537f263e1) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update actions

## 1.15.2

### Patch Changes

- [`8e54e97`](https://github.com/elsoul/skeet/commit/8e54e9728417f4e0176edeebfbbbc83f5c23bd67) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - add actions

## 1.15.0

### Minor Changes

- [`5f117b1`](https://github.com/elsoul/skeet/commit/5f117b1c380530b1aa34e902c5db5eec83b17fd1) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Migrate to PNPM

## 1.14.100

### Patch Changes

- [`9105d33`](https://github.com/elsoul/skeet/commit/9105d331bc40da590a94a0f72889b2fc64a734c3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Migrate to PNPM

## 1.15.0

### Minor Changes

- 8f36836: migrate to pnpm
- 28934f5: Migate to PNPM
