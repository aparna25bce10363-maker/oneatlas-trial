import { z }
from "zod"

export const FieldValidator =
  z.object({

    name:
      z.string(),

    type:
      z.string(),

    nullable:
      z.boolean(),

    isRelation:
      z.boolean(),

    isPrimary:
      z.boolean(),

    isUnique:
      z.boolean()

  })

export const RelationValidator =
  z.object({

    type:
      z.enum([

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

export const EntityValidator =
  z.object({

    name:
      z.string(),

    tableName:
      z.string(),

    fields:
      z.array(
        FieldValidator
      ),

    relations:
      z.array(
        RelationValidator
      )

  })

export const SchemaValidator =
  z.object({

    entities:
      z.array(
        EntityValidator
      )

  })

export type SchemaType =
  z.infer<
    typeof SchemaValidator
  >