import fs from 'node:fs'
import path from 'node:path'
import schema from './schema.js'
import Database from 'better-sqlite3'
import { logger } from './logger.js'

export const connect = dbPath => {
  let newDB = false
  try {
    fs.accessSync(dbPath, fs.constants.F_OK)
  } catch {
    newDB = true

    const dir = path.dirname(dbPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  const startTime = Date.now()
  const db = new Database(dbPath)
  const connectionTime = Date.now() - startTime
  logger.info({ connectionTime }, 'Database connection established')

  if (newDB) {
    db.pragma('journal_mode = WAL') // set once on creation
  }

  // others are required for each connection
  db.pragma('synchronous = NORMAL')
  db.pragma('cache_size = -64000')
  db.pragma('temp_store = MEMORY')
  db.pragma('mmap_size = 268435456')
  db.pragma('foreign_keys = ON')
  db.pragma('optimize')

  migrate(db)
  seed(db)

  return db
}

const migrate = db => {
  db.function('strip_accents', { deterministic: true }, str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  })

  const tableSQL = fs.readFileSync('./dist/sql/table.sql').toString()
  for (const name of schema.tableNames()) {
    const table = schema.tableConfig(name)
    const createTable = tableSQL.replaceAll('TARGET', table.name)
    db.transaction(() => {
      db.exec(createTable)
    })()
  }

  const custom = fs.readFileSync('./dist/sql/custom.sql').toString()
  db.transaction(() => {
    db.exec(custom)
  })()
  logger.info('migration complete!')
}

const seed = db => {
  const insertStmt = db.prepare('INSERT INTO products (data) VALUES (?)')
  const checkStmt = db.prepare(
    "SELECT COUNT(*) as count FROM products WHERE json_extract(data, '$.ref') = ?",
  )

  const products = [
    {
      ref: 'product-1',
      name: 'A really nice pen',
      description: 'silver, ballpoint pen',
    },
    {
      ref: 'product-2',
      name: 'A really nice water bottle',
      description: 'big enough to avoid refilling every 30 minutes!',
    },
  ]

  for (const product of products) {
    const productCheck = checkStmt.get(product.ref)

    if (productCheck.count === 0) {
      insertStmt.run(JSON.stringify(product))
    }
  }
}

export const updateWithChecksum = (
  db,
  name,
  keyValue,
  originalChecksum,
  updatedData,
) => {
  const config = schema.tableConfig(name)
  if (!config) {
    throw new Error(`Table ${name} not configured for operations`)
  }

  const validation = schema.validate(name, updatedData)
  if (!validation.success) {
    return validation
  }

  const getStmt = db.prepare(
    `SELECT * FROM ${table.name} WHERE json_extract(data, '$.${table.key}') = ?`,
  )
  const updateStmt = db.prepare(
    `UPDATE ${table.name} SET data = ? WHERE json_extract(data, '$.${table.key}') = ?`,
  )

  const currentRecord = getStmt.get(keyValue)
  if (!currentRecord) {
    return { success: false, error: `${table.name} record not found` }
  }

  const currentData = JSON.parse(currentRecord.data)
  const currentChecksum = calculateChecksum(currentData)

  // Check if data has changed since original load
  if (originalChecksum !== currentChecksum) {
    return {
      success: false,
      error: `${tableName} record was modified by another user. Please refresh and try again.`,
      current_data: currentData,
      current_checksum: currentChecksum,
    }
  }

  // Update timestamp (use validated data)
  const dataToSave = {
    ...validation.data,
    updated_at: new Date().toISOString(),
  }

  const result = updateStmt.run(JSON.stringify(dataToSave), keyValue)

  return result.changes > 0
    ? {
        success: true,
        data: dataToSave,
        checksum: calculateChecksum(dataToSave),
      }
    : { success: false, error: 'Update failed' }
}

export const insert = (db, table, data) => {
  const validation = validateBusinessData(table, data)
  if (!validation.success) {
    return validation
  }

  if (!schema.tableNames().includes(table)) {
    throw new Error(`Invalid table name: ${table}`)
  }

  const insertStmt = `INSERT INTO ${table} (data) VALUES (?)`
  return db.prepare(insertStmt).run(JSON.stringify(data))
}

export const productsByRandom = (db, n) => {
  const getStmt = db.prepare(
    'SELECT data FROM products ORDER BY RANDOM() LIMIT ?',
  )
  return getStmt.all(n).map(row => JSON.parse(row.data))
}
