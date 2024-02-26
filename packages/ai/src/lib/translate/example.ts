import { translate } from './translate'

const run = async () => {
  const text: string = 'Hello, world!How are you? What are you up for today?'
  const target: string = 'ja'
  const response = await translate(text, target)
  console.log(response)
}

run()
