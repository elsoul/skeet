export const skeetCliHelps = `Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for
                               multiple functions
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  help [command]               display help for command


Usage: skeet create [options] <appName>

Create Skeet Framework App

Arguments:
  appName        Name of the app

Options:
  -b, --backend  Create Backend Only (default: false)
  -h, --help     display help for command


Usage: skeet deploy [options]

Deploy Skeet APP to Firebase

Options:
  -f, --function <function>  Function Name. e.g. skeet:root
  -h, --help                 display help for command


Usage: skeet init [options]

Initialize Google Cloud Setups for Skeet APP

Options:
  --login        Activate Firebase Login (default: false)
  --config       Generate Skeet Cloud Config (default: false)
  --lb           Setup Cloud Load Balancer (default: false)
  -n, --network  Setup Network (default: false)
  -h, --help     display help for command


Usage: skeet yarn [options] <yarnCmd>

Skeet Yarn Comannd to run yarn command for multiple functions

Arguments:
  yarnCmd                Yarn Command - e.g. skeet yarn add -D @types/node

Options:
  -p, --p <packageName>  npm package name (default: "")
  -D, --d <packageName>  npm package name (default: "")
  -h, --help             display help for command


Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for
                               multiple functions
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  help [command]               display help for command


Usage: skeet login [options]

Skeet Login Command - Create Firebase Login Token

Options:
  -h, --help  display help for command


Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for
                               multiple functions
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  help [command]               display help for command


Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for
                               multiple functions
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  help [command]               display help for command


Usage: skeet docker [options] [command]

Docker commands

Options:
  -h, --help      display help for command

Commands:
  psql            Run psql in docker container
  login           Login to docker - ./keyfile.json is required
  run             Run Skeet GraphQL Backend Container
  build           Build Skeet GraphQL Backend Container
  rm              Remove Skeet GraphQL Backend Container
  help [command]  display help for command


Usage: skeet db [options] [command]

Database commands

Options:
  -h, --help                display help for command

Commands:
  migrate [options] <name>  Initialize database
  generate                  Prisma Generate command
  deploy [options]          Prisma DB Deploy command
  reset                     Prisma DB Reset command
  seed [options]            Prisma DB Seed command
  studio [options]          Prisma DB Studio command
  help [command]            display help for command


Usage: skeet iam [options] [command]

Skeet IAM Comannd to setup Google Cloud Platform

Options:
  -h, --help      display help for command

Commands:
  ai              Setup AI for Google Cloud Platform
  init            Setup IAM for Google Cloud Platform
  pull            Download IAM Key for Google Cloud Platform
  sync            Sync Service Account Key as GitHub Secret
  help [command]  display help for command


Usage: skeet add [options] [command]

Skeet Add Comannd to add new functions

Options:
  -h, --help                     display help for command

Commands:
  functions <functionsName>
  method [options] <methodName>
  model <modelName>
  app <appDisplayName>
  secret <secretKey>
  ghSecret <secretKey>
  webAppDomain [options]
  ip
  graphql|graphQL                Add GraphQL
  help [command]                 display help for command


Usage: skeet sync [options] [command]

Skeet Sync Comannd to sync backend and frontend

Options:
  -h, --help      display help for command

Commands:
  routings|r      Skeet Sync Routings
  armors|a        Skeet Sync Cloud Armor Rules
  sql             Skeet Sync SQL
  taskQueue       Skeet Sync Task Queue
  runUrl          Skeet Sync Run Url
  help [command]  display help for command


Usage: skeet get [options] [command]

Get Skeet App List

Options:
  -h, --help             display help for command

Commands:
  functions|function     Show Skeet Functions List
  https                  Show Skeet Https List
  dns                    Show Skeet NameServer Records
  secret <secretKey>     Get Skeet Secret Value
  models|m               Show Skeet Models List
  columns|c <modelName>  Show Skeet Models columns
  files|file [options]   Show Recent Updated Files
  help [command]         display help for command


Usage: skeet ai [options]

AI Playground

Options:
  -v, --vertex                   Vertex AI
  -o, --openai                   OpenAI
  -m, --model <string>           Model
  -token, --token <number>       Max Tokens
  -temp, --temperature <number>  Temperature
  -h, --help                     display help for command


Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for
                               multiple functions
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  help [command]               display help for command
`
