import { Prisma } from '@prisma/client'

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError | any,
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Please refer to the Prisma error codes documentation
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
    // Please add more error codes as needed
  }
  // Fallback to a generic error message
  return {
    status: 'error',
    message: 'An unexpected error occurred',
  }
}
