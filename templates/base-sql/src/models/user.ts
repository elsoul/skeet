import { handlePrismaError } from '@/lib/handlePrismaError'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createUser = async (userData: Prisma.UserCreateInput) => {
  try {
    return await prisma.user.create({ data: userData })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const getUserById = async (id: number) => {
  try {
    return await prisma.user.findUnique({ where: { id } })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const updateUser = async (
  id: number,
  userData: Partial<Prisma.UserCreateInput>,
) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: userData,
    })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const deleteUser = async (id: number) => {
  try {
    return await prisma.user.delete({ where: { id } })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const queryUsers = async (query: Prisma.UserFindManyArgs) => {
  try {
    return await prisma.user.findMany(query)
  } catch (error) {
    return handlePrismaError(error)
  }
}
