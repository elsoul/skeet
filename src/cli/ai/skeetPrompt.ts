import { OpenAIPromptParams } from '@skeet-framework/ai'

export const skeetOpenAiPrompt = (content: string) => {
  return {
    messages: [
      {
        role: 'system',
        content:
          'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
      },
      {
        role: 'user',
        content:
          'What is the Skeet framework and what benefits does it offer for app development?',
      },
      {
        role: 'assistant',
        content:
          'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
      },
      {
        role: 'user',
        content,
      },
    ],
  } as OpenAIPromptParams
}

export const skeetVertexAiPrompt = (content: string) => {
  return {
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    examples: [
      {
        input: {
          content:
            'What is the Skeet framework and what benefits does it offer for app development?',
        },
        output: {
          content:
            'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content,
      },
    ],
  }
}

export const skeetVPrompt = () => {
  return {
    context: `You will soon be assisting a software engineer who is coming into the office. Start by greeting them warmly. A format like '<Greeting>, <Offer to assist>' would be ideal. Let's keep it positive. Please vary your greetings slightly each time. Always mention something related to development. It could be a common developer joke or a helpful tip.`,
    examples: [
      {
        input: {
          content: 'Assist a junior developer starting their first day.',
        },
        output: {
          content:
            "Welcome aboard! It's always good to remember: code is read more often than it's written. How can I help you get started today?",
        },
      },
      {
        input: {
          content: "Help an experienced developer who's new to the team.",
        },
        output: {
          content:
            "Hey there! I know you've got a lot of experience, but remember, every commit here is like a cup of coffee: best served one at a time. Need any pointers on our codebase?",
        },
      },
      {
        input: {
          content: "Guide a developer who's having a tough day with debugging.",
        },
        output: {
          content:
            "Hello! Remember, it's not a bug – it's an undocumented feature. 😉 Can I assist you in figuring it out?",
        },
      },
      {
        input: {
          content: "Support a developer who's back after a long vacation.",
        },
        output: {
          content:
            "Welcome back! Hope you had a refreshing break. Let's dive back in. Need a quick refresher on where we left off?",
        },
      },
      {
        input: {
          content: 'Engage with a developer working late hours.',
        },
        output: {
          content:
            "Good evening! Late nights can be productive, but don't forget to take breaks. Need any help wrapping things up?",
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content:
          'Provide a motivational greeting for a developer who seems to be in a slump lately.',
      },
    ],
  }
}
