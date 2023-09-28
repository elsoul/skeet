import { GRAPHQL_PATH } from '@/index'

export const saveSkeetSolanaTransfer = async () => {
  const filePath = GRAPHQL_PATH + '/responseManager/saveSkeetSolanaTransfer.ts'
  const body = await saveSkeetSolanaTransferCode()
  return {
    filePath,
    body,
  }
}

const saveSkeetSolanaTransferCode = async () => {
  return `import { extendType, floatArg, intArg, nonNull, stringArg } from 'nexus'

export const saveSkeetSolanaTransfer = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('saveSkeetSolanaTransfer', {
      type: 'Boolean',
      args: {
        id: intArg(),
        toAddressPubkey: nonNull(stringArg()),
        fromAddressPubkey: nonNull(stringArg()),
        transferAmountLamport: nonNull(intArg()),
        tokenMintAddress: nonNull(stringArg()),
        signature: nonNull(stringArg()),
        usdcPrice: nonNull(floatArg()),
        timestamp: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          console.log(
            \`saveSkeetSolanaTransfer: \${JSON.stringify(args, null, 2)}\`
          )
          return true
        } catch (error) {
          console.log(error)
          throw new Error(\`error: \${error}\`)
        }
      },
    })
  },
})`
}
