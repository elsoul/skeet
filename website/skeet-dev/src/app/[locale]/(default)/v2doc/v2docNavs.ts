import { Section } from '@/lib/articles'

export const v2docMenuData: Section[] = [
  {
    title: 'v2doc.menuNav.general.overall-architecture',
    route: '/v2doc/general/overall-architecture',
    items: [
      {
        title: 'v2doc.menuNav.general.motivation',
        route: '/v2doc/general/motivation',
      },
      {
        title: 'v2doc.menuNav.skeet-firestore.groupTitle',
        subItems: [
          {
            title: 'v2doc.menuNav.skeet-firestore.quickstart',
            route: '/v2doc/skeet-firestore/quickstart',
          },
          {
            title: 'v2doc.menuNav.skeet-firestore.setup',
            route: '/v2doc/skeet-firestore/setup',
          },
          {
            title: 'v2doc.menuNav.skeet-firestore.tutorial',
            route: '/v2doc/skeet-firestore/tutorial',
          },
          {
            title: 'v2doc.menuNav.skeet-firestore.basic-architecture',
            route: '/v2doc/skeet-firestore/basic-architecture',
          },
        ],
      },
      {
        title: 'v2doc.menuNav.skeet-ai.groupTitle',
        subItems: [
          {
            title: 'v2doc.menuNav.skeet-ai.skeet-ai-basic',
            route: '/v2doc/skeet-ai/basic',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.prisma',
            route: '/v2doc/skeet-ai/prisma',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.method',
            route: '/v2doc/skeet-ai/method',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.typedoc',
            route: '/v2doc/skeet-ai/typedoc',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.firestore',
            route: '/v2doc/skeet-ai/firestore',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.translate',
            route: '/v2doc/skeet-ai/translate',
          },
          {
            title: 'v2doc.menuNav.skeet-ai.function',
            route: '/v2doc/skeet-ai/function',
          },
        ],
      },
      {
        title: 'v2doc.menuNav.plugins.groupTitle',
        subItems: [
          {
            title: 'v2doc.menuNav.plugins.skeet-ai',
            route: '/v2doc/plugins/skeet-ai',
          },
          {
            title: 'v2doc.menuNav.plugins.skeet-firestore',
            route: '/v2doc/plugins/skeet-firestore',
          },
          {
            title: 'v2doc.menuNav.plugins.skeet-utils',
            route: '/v2doc/plugins/skeet-utils',
          },
        ],
      },
      {
        title: 'v2doc.menuNav.frontend.groupTitle',
        subItems: [
          {
            title: 'v2doc.menuNav.frontend.nextjs-firestore-template',
            route: '/v2doc/frontend/nextjs-firestore-template',
          },
          {
            title: 'v2doc.menuNav.frontend.expo-firestore-template',
            route: '/v2doc/frontend/expo-firestore-template',
          },
          {
            title: 'v2doc.menuNav.frontend.solana-firestore-template',
            route: '/v2doc/frontend/solana-firestore-template',
          },
        ],
      },
    ],
  },
]
