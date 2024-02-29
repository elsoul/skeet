export const CLI_HELP = `Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <appName>   Create Skeet Framework App
  server|s [options]           Run Skeet App
  deploy [options]             Deploy Skeet APP to Firebase
  init [options]               Initialize Google Cloud Setups for Skeet APP
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  log [options]                Deploy Skeet APP to Firebase
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  config                       Config commands
  run [options]                Run commands
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
  -d, --discord              Deploy Discord Commands (default: false)
  --sql                      Deploy SQL (default: false)
  -h, --help                 display help for command

Usage: skeet init [options]

Initialize Google Cloud Setups for Skeet APP

Options:
  --login        Activate Firebase Login (default: false)
  --config       Generate Skeet Cloud Config (default: false)
  --lb           Setup Cloud Load Balancer (default: false)
  --sql          Setup SQL (default: false)
  -n, --network  Setup Network (default: false)
  -h, --help     display help for command

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
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  log [options]                Deploy Skeet APP to Firebase
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  config                       Config commands
  run [options]                Run commands
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
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  log [options]                Deploy Skeet APP to Firebase
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  config                       Config commands
  run [options]                Run commands
  help [command]               display help for command

Usage: skeet log [options]

Deploy Skeet APP to Firebase

Options:
  -f, --function <function>  Function Name. e.g. root
  -aa, --AA                  Show AA logs (default: false)
  -h, --help                 display help for command

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
  -h, --help         display help for command

Commands:
  migrate [options]  Initialize database
  generate           Prisma Generate command
  deploy [options]   Prisma DB Deploy command
  reset [options]    Prisma DB Reset command
  seed [options]     Prisma DB Seed command
  studio [options]   Prisma DB Studio command
  help [command]     display help for command

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
  -h, --help                 display help for command

Commands:
  functions <functionsName>
  method [options]
  model <modelName>
  app <appDisplayName>
  secret <secretKey>
  ghSecret <secretKey>
  ghActions                  Add Github Actions
  webAppDomain [options]
  ip
  sql|SQL                    Add Cloud SQL
  webhook|webHook            Add Webhook Endpoint
  taskQueue|tq <queueName>
  help [command]             display help for command

Usage: skeet sync [options] [command]

Skeet Sync Comannd to sync backend and frontend

Options:
  -h, --help       display help for command

Commands:
  routings|r       Skeet Sync Routings
  armors|a         Skeet Sync Cloud Armor Rules
  sql              Skeet Sync SQL
  taskQueue|tq     Skeet Sync Task Queue
  runUrl           Skeet Sync Run Url
  ghEnv [options]  Sync Env File to Github Secret
  help [command]   display help for command

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
  users [options]        Download Firebase Auth Users in JSON
  help [command]         display help for command

Usage: skeet ai [options]

AI Playground

Options:
  -g, --gemini                   Gemini
  -o, --openai                   OpenAI
  -m, --model <string>           Model
  -token, --token <number>       Max Tokens
  -temp, --temperature <number>  Temperature
  -h, --help                     display help for command

Usage: skeet config [options] [command]

Config commands

Options:
  -h, --help      display help for command

Commands:
  set [options]   Set Google Cloud Config
  help [command]  display help for command

Usage: skeet run [options]

Run commands

Options:
  -F, --filter <filter>  Filter By Package Name (default: "")
  -C, --cmd <cmd>        Command (default: "")
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
  login                        Skeet Login Command - Create Firebase Login
                               Token
  curl [options] <methodName>  Skeet Curl Command - Call Firebase Functions
                               Endpoint
  g|generate                   Skeet Generate Comannd
  release|r [options]          Release a new version
  log [options]                Deploy Skeet APP to Firebase
  docker                       Docker commands
  db                           Database commands
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  get                          Get Skeet App List
  ai [options]                 AI Playground
  config                       Config commands
  run [options]                Run commands
  help [command]               display help for command
`