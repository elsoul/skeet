import { toCamelCase, toPascalCase } from '@/utils/string'

export const routing = (sqlName: string, modelName: string) => {
  const modelNamePascal = toPascalCase(modelName)
  const modelNameCamel = toCamelCase(modelName)
  const filePath = `./sql/${sqlName}/src/routes/${modelNameCamel}.ts`
  const body = `import { Hono } from 'hono'
import {
  create${modelNamePascal},
  get${modelNamePascal}ById,
  update${modelNamePascal},
  delete${modelNamePascal},
  getAll${modelNamePascal}s,
  query${modelNamePascal}s,
} from '@/models/${modelNameCamel}'

const ${modelNameCamel}Router = new Hono()

// Create ${modelNamePascal}
${modelNameCamel}Router.post('/', async (c) => {
  const ${modelNameCamel}Data = await c.req.json()
  const ${modelNameCamel} = await create${modelNamePascal}(${modelNameCamel}Data)
  return c.json(${modelNameCamel})
})

// Get ${modelNamePascal} by ID
${modelNameCamel}Router.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid ${modelNameCamel} ID',
      },
      400,
    )
  }
  const ${modelNameCamel} = await get${modelNamePascal}ById(id)
  return ${modelNameCamel} ? c.json(${modelNameCamel}) : c.notFound()
})

// Update ${modelNamePascal}
${modelNameCamel}Router.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const ${modelNameCamel}Data = await c.req.json()
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid ${modelNameCamel} ID',
      },
      400,
    )
  }
  const updated${modelNamePascal} = await update${modelNamePascal}(id, ${modelNameCamel}Data)
  return c.json(updated${modelNamePascal})
})

// Delete ${modelNamePascal}
${modelNameCamel}Router.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json(
      {
        status: 'error',
        message: 'Invalid ${modelNameCamel} ID',
      },
      400,
    )
  }
  const result = await delete${modelNamePascal}(id)
  return c.json(result)
})

// Get All ${modelNamePascal}s
${modelNameCamel}Router.get('/', async (c) => {
  const ${modelNameCamel}s = await getAll${modelNamePascal}s()
  return c.json(${modelNameCamel}s)
})

// Query ${modelNamePascal}s
${modelNameCamel}Router.post('/query', async (c) => {
  const query = await c.req.json()
  const ${modelNameCamel}s = await query${modelNamePascal}s(query)
  return c.json(${modelNameCamel}s)
})

export { ${modelNameCamel}Router }
`
  return {
    filePath,
    body,
  }
}
