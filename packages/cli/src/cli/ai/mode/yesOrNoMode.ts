import inquirer from 'inquirer'

export const yesOrNo = async (text: string) => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: text,
      choices: ['Yes', 'No'],
    },
  ])
  return answer.answer === 'Yes'
}
