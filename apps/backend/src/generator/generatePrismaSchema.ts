export function generatePrismaSchema(
  entities: any[]
) {
  let schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`

  for (const entity of entities) {
    schema += `

model ${entity.name} {
`

    for (const field of entity.fields) {
      let prismaType = "String"

      if (field.type.includes("int")) {
        prismaType = "Int"
      } else if (field.type.includes("decimal")) {
        prismaType = "Float"
      } else if (field.type.includes("boolean")) {
        prismaType = "Boolean"
      } else if (field.type.includes("uuid")) {
        prismaType = "String"
      }

      const optional = field.nullable ? "?" : ""

      const id = field.primaryKey
        ? "@id"
        : ""

      const unique = field.unique
        ? "@unique"
        : ""

      schema += `
  ${field.name} ${prismaType}${optional} ${id} ${unique}
`
    }

    schema += `
}
`
  }

  return schema
}