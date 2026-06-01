import { z }
from "zod"

export const FieldZod = z.object({

  name: z.string(),

  type: z.string(),

  nullable:
    z.boolean(),

  isRelation:
    z.boolean(),

  isPrimary:
    z.boolean(),

  isUnique:
    z.boolean()

})

export const RelationZod =
  z.object({

    type: z.enum([

      "hasMany",

      "belongsTo",

      "hasOne"

    ]),

    target:
      z.string(),

    foreignKey:
      z.string(),

    onDelete:
      z.string()

  })

export const EntityZod =
  z.object({

    name:
      z.string(),

    tableName:
      z.string(),

    fields:
      z.array(FieldZod),

    relations:
      z.array(RelationZod)

  })

export const SchemaZod =
  z.object({

    entities:
      z.array(EntityZod)

  })

export type DataSchema =
  z.infer<typeof SchemaZod>