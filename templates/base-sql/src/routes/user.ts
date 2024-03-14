import { Hono } from 'hono'
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  queryUsers,
} from '@/models/user'

const userRouter = new Hono()

// Create User
userRouter.post('/', async (c) => {
  const userData = await c.req.json()
  const user = await createUser(userData)
  return c.json(user)
})

// Get User by ID
userRouter.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid user ID',
      },
      400,
    )
  }
  const user = await getUserById(id)
  return user ? c.json(user) : c.notFound()
})

// Update User
userRouter.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const userData = await c.req.json()
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid user ID',
      },
      400,
    )
  }
  const updatedUser = await updateUser(id, userData)
  return c.json(updatedUser)
})

// Delete User
userRouter.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid user ID',
      },
      400,
    )
  }
  const result = await deleteUser(id)
  return c.json(result)
})

// Get All Users
userRouter.get('/', async (c) => {
  const users = await getAllUsers()
  return c.json(users)
})

// Query Users
userRouter.post('/query', async (c) => {
  const query = await c.req.json()
  const users = await queryUsers(query)
  return c.json(users)
})

export { userRouter }
