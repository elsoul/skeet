import { Prisma } from '@prisma/client'

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError | any,
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // 特定のエラーコードに基づいたカスタムエラーメッセージのハンドリング
    if (error.code === 'P2002') {
      return {
        status: 'error',
        message: 'User already exists',
        model: error.meta?.model,
        reason: error.meta?.target,
      }
    } else if (error.code === 'P2003') {
      return {
        status: 'error',
        message: 'User not created',
      }
    }
    // 他のPrismaエラーコードに基づく処理をここに追加...
  }
  // 予期しないエラーの処理
  return {
    status: 'error',
    message: 'An unexpected error occurred',
  }
}
