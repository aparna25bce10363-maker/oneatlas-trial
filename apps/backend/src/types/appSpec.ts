import { z }
from "zod"

export const AppSpecZod = z.object({

  pages: z.array(

    z.object({

      name: z.string(),

      route: z.string(),

      layout: z.string(),

      entity: z.string(),

      components:
        z.array(z.string())

    })

  ),

  apiEndpoints: z.array(

    z.object({

      path: z.string(),

      method: z.string(),

      handler: z.string(),

      entity: z.string(),

      authRequired:
        z.boolean(),

      rateLimited:
        z.boolean()

    })

  ),

  authRules: z.array(

    z.object({

      role: z.string(),

      permissions: z.array(

        z.object({

          entity: z.string(),

          read: z.boolean(),

          write: z.boolean(),

          delete: z.boolean()

        })

      )

    })

  ),

  workflowStubs: z.array(

    z.object({

      name: z.string(),

      trigger: z.object({

        entity: z.string(),

        event: z.string(),

        condition:
          z.string().optional()

      }),

      integration:
        z.string(),

      action:
        z.string(),

      payload:
          z.record(
          z.string(),
          z.any()
  )

    })

  )

})