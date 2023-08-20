export type PrismaModel = {
  name: string
  fields: Array<{ name: string; type: string; isOptional: boolean }>
}

export function prismaSchemaToTypeScriptTypes(prismaSchema: string): string {
  const models: PrismaModel[] = []

  const lines = prismaSchema.split('\n')
  let currentModel: PrismaModel | null = null

  for (const line of lines) {
    const modelMatch = line.match(/^model (\w+) \{$/)
    const enumMatch = line.match(/^enum (\w+) \{$/)

    if (modelMatch) {
      currentModel = { name: modelMatch[1], fields: [] }
      models.push(currentModel)
      continue
    }

    if (enumMatch) {
      currentModel = null
      // Handle enums (future improvement)
      continue
    }

    if (line.includes('}')) {
      currentModel = null
      continue
    }

    if (currentModel) {
      const fieldMatch = line.match(/(\w+)\s+(\w+)(\?)?/)
      if (fieldMatch) {
        currentModel.fields.push({
          name: fieldMatch[1],
          type: fieldMatch[2],
          isOptional: !!fieldMatch[3],
        })
      }
    }
  }

  let output = ''
  for (const model of models) {
    output += `export type ${model.name} = {\n`
    for (const field of model.fields) {
      const tsType = mapPrismaTypeToTsType(field.type)
      output += `  ${field.name}${field.isOptional ? '?' : ''}: ${tsType};\n`
    }
    output += '}\n\n'
  }

  return output
}

function mapPrismaTypeToTsType(prismaType: string): string {
  switch (prismaType) {
    case 'Int':
      return 'number'
    case 'String':
      return 'string'
    case 'Boolean':
      return 'boolean'
    case 'DateTime':
      return 'Timestamp'
    default:
      return prismaType // For enums and custom types
  }
}

// Example usage
// const tsTypes = prismaSchemaToTypeScriptTypes(yourPrismaSchemaHere);
// console.log(tsTypes);
