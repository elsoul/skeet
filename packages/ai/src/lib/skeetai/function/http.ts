export const http = `import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/types/http'
import { <functionNameParams> } from '@/types/http/<functionName>Params'

export const <functionName> = onRequest(publicHttpOption, async (req: TypedRequestBody<<functionNameParams>>, res) => {
  try {
    <yourScript>
    res.json({
      status: 'success'
    })
  } catch (error) {
    res.status(500).json({ status: 'error', message: String(error) })
  }
})
  `

export const httpExample = {
  input: `Create an endpoint that create UserChatRoom.
1. Get Params from request.
2. Get User from getUserAith.
3. Create UserChatRoom params.
4. Create UserChatRoom.
5. Return UserChatRoom.

Please add more scripts if it's necessary.
`,
  output: `      const body = {
model: req.body.model || 'gpt-3.5-turbo',
systemContent:
req.body.systemContent ||
'This is a great chatbot. This Assistant is very kind and helpful.',
maxTokens: req.body.maxTokens || 256,
temperature:
req.body.temperature == 0
  ? 0
  : !req.body.temperature
  ? 1
  : req.body.temperature,
stream: req.body.stream || true,
}
const user = await getUserAuth(req)

const parentId = user.uid || ''
const params: UserChatRoom = {
title: '',
model: body.model,
maxTokens: body.maxTokens,
temperature: body.temperature,
stream: body.stream,
context: body.systemContent,
}
const userChatRoomPath = genUserChatRoomPath(parentId)
const userChatRoomDoc = await add<UserChatRoom>(
db,
userChatRoomPath,
params,
)
console.log(\`created userChatRoom: \${userChatRoomDoc.id}\`)
res.json({ status: 'success', userChatRoomId: userChatRoomDoc.id })`,
}
