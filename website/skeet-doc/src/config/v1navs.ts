// Icons => https://heroicons.com/
import {
  HeartIcon,
  HomeIcon,
  RocketLaunchIcon,
  WindowIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  BookOpenIcon,
  FireIcon,
  CloudArrowUpIcon,
  CommandLineIcon,
  CogIcon,
  Cog6ToothIcon,
  BoltIcon,
  CircleStackIcon,
  Cog8ToothIcon,
  RectangleGroupIcon,
  LanguageIcon,
  NewspaperIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'common:navs.defaultMainNav.doc',
    href: '/v1doc/',
  },
  {
    name: 'common:navs.defaultMainNav.quickstart',
    href: '/v1doc/skeet-firestore/quickstart',
  },
  {
    name: 'common:navs.defaultMainNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.defaultMainNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.defaultMainNav.company',
    href: '/company/',
  },
]

export const commonFooterNav = [
  {
    name: 'common:navs.commonFooterNav.doc',
    href: '/v1doc/',
  },
  {
    name: 'common:navs.commonFooterNav.quickstart',
    href: '/v1doc/skeet-firestore/quickstart',
  },
  {
    name: 'common:navs.defaultMainNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.commonFooterNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.commonFooterNav.company',
    href: '/company/',
  },
  {
    name: 'common:navs.commonFooterNav.press-kits',
    href: '/press-kits/',
  },
  {
    name: 'common:navs.commonFooterNav.privacy',
    href: '/legal/privacy-policy/',
  },
]

const skeetCliNav = [
  {
    name: 'v1doc:menuNav.skeet-cli.create',
    href: '/v1doc/skeet-cli/skeet-cli-create/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.server',
    href: '/v1doc/skeet-cli/skeet-cli-server/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.deploy',
    href: '/v1doc/skeet-cli/skeet-cli-deploy/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.init',
    href: '/v1doc/skeet-cli/skeet-cli-init/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.iam',
    href: '/v1doc/skeet-cli/skeet-cli-iam/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.yarn',
    href: '/v1doc/skeet-cli/skeet-cli-yarn/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.add',
    href: '/v1doc/skeet-cli/skeet-cli-add/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.sync',
    href: '/v1doc/skeet-cli/skeet-cli-sync/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.delete',
    href: '/v1doc/skeet-cli/skeet-cli-delete/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.login',
    href: '/v1doc/skeet-cli/skeet-cli-login/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.list',
    href: '/v1doc/skeet-cli/skeet-cli-list/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.curl',
    href: '/v1doc/skeet-cli/skeet-cli-curl/',
    icon: CommandLineIcon,
  },
  {
    name: 'v1doc:menuNav.skeet-cli.test',
    href: '/v1doc/skeet-cli/skeet-cli-test/',
    icon: CommandLineIcon,
  },
]
export const docMenuNav = [
  { name: 'v1doc:menuNav.home', href: '/v1doc/', icon: HomeIcon },
  {
    name: 'v1doc:menuNav.general.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.general.motivation',
        href: '/v1doc/general/motivation/',
        icon: HeartIcon,
      },
      {
        name: 'v1doc:menuNav.general.overall-architecture',
        href: '/v1doc/general/overall-architecture/',
        icon: RectangleGroupIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.skeet-graphql.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.skeet-graphql.quickstart',
        href: '/v1doc/skeet-graphql/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-graphql.setup',
        href: '/v1doc/skeet-graphql/setup/',
        icon: Cog6ToothIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-graphql.tutorial',
        href: '/v1doc/skeet-graphql/tutorial/',
        icon: AcademicCapIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-graphql.initial-deploy',
        href: '/v1doc/skeet-graphql/initial-deploy/',
        icon: CloudArrowUpIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-graphql.basic-architecture',
        href: '/v1doc/skeet-graphql/basic-architecture/',
        icon: BookOpenIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.skeet-firestore.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.skeet-firestore.quickstart',
        href: '/v1doc/skeet-firestore/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-firestore.setup',
        href: '/v1doc/skeet-firestore/setup/',
        icon: Cog6ToothIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-firestore.tutorial',
        href: '/v1doc/skeet-firestore/tutorial/',
        icon: AcademicCapIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-firestore.initial-deploy',
        href: '/v1doc/skeet-firestore/initial-deploy/',
        icon: CloudArrowUpIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-firestore.basic-architecture',
        href: '/v1doc/skeet-firestore/basic-architecture/',
        icon: BookOpenIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.skeet-ai.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.skeet-ai.skeet-ai-basic',
        href: '/v1doc/skeet-ai/basic/',
        icon: BookOpenIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.prisma',
        href: '/v1doc/skeet-ai/prisma/',
        icon: CircleStackIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.method',
        href: '/v1doc/skeet-ai/method/',
        icon: Cog8ToothIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.typedoc',
        href: '/v1doc/skeet-ai/typedoc/',
        icon: NewspaperIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.firestore',
        href: '/v1doc/skeet-ai/firestore/',
        icon: FireIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.translate',
        href: '/v1doc/skeet-ai/translate/',
        icon: LanguageIcon,
      },
      {
        name: 'v1doc:menuNav.skeet-ai.function',
        href: '/v1doc/skeet-ai/function/',
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.plugins.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.plugins.skeet-ai',
        href: '/v1doc/plugins/skeet-ai/',
        icon: BoltIcon,
      },
      {
        name: 'v1doc:menuNav.plugins.skeet-firestore',
        href: '/v1doc/plugins/skeet-firestore/',
        icon: FireIcon,
      },
      {
        name: 'v1doc:menuNav.plugins.skeet-utils',
        href: '/v1doc/plugins/skeet-utils/',
        icon: CogIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.frontend.groupTitle',
    children: [
      {
        name: 'v1doc:menuNav.frontend.nextjs-graphql-template',
        href: '/v1doc/frontend/nextjs-graphql-template/',
        icon: WindowIcon,
      },
      {
        name: 'v1doc:menuNav.frontend.nextjs-firestore-template',
        href: '/v1doc/frontend/nextjs-firestore-template/',
        icon: WindowIcon,
      },
      {
        name: 'v1doc:menuNav.frontend.expo-firestore-template',
        href: '/v1doc/frontend/expo-firestore-template/',
        icon: DevicePhoneMobileIcon,
      },
      {
        name: 'v1doc:menuNav.frontend.solana-firestore-template',
        href: '/v1doc/frontend/solana-firestore-template/',
        icon: DevicePhoneMobileIcon,
      },
    ],
  },
  {
    name: 'v1doc:menuNav.skeet-cli.groupTitle',
    children: skeetCliNav,
  },
]

export const docHeaderNav = [
  {
    name: 'v1doc:headerNav.home',
    href: '/',
  },
  {
    name: 'v1doc:headerNav.news',
    href: '/news/',
  },
]
