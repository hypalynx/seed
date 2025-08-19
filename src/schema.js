import * as z from 'zod'

// table 'name', primary 'key' and 'search' fields (we index them)
const tables = [
  { name: 'products', key: 'ref', searchBy: ['ref'], schema: Product },
]

const Timestamp = z.object({
  created_at: z.string(),
  updated_at: z.string(),
})

const Product = z
  .object({
    ref: z.string(),
    name: z.string(),
    description: z.string(),
  })
  .merge(Timestamp)
  .strict()

export const validate = (name, data) => {
  const schema = tableConfig(name)?.schema
  if (!schema) {
    throw new Error(`No schema defined for table: ${name}`)
  }

  try {
    const result = schema.safeParse(data)
    if (result.success) {
      return {
        success: true,
        data: result.data,
      }
    } else {
      const errors = result.error?.issues || []
      return {
        success: false,
        error: `Validation failed for ${name}: ${errors.length > 0 ? errors : 'Unknown validation error'}`,
        issues: errors,
      }
    }
  } catch (error) {
    return {
      success: false,
      error: `Schema validation failed for ${name}: ${error}`,
      issues: [],
    }
  }
}

const tableConfig = tableName => {
  return tables.find(table => table.name === tableName)
}

const tableNames = () => {
  return tables.map(table => table.name)
}

export default { Product, validate, tableConfig, tableNames }
