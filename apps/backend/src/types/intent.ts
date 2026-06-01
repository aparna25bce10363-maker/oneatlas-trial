import { z }
from "zod"

export const IntentZod = z.object({

  success: z.boolean(),

  data: z.object({

    appName:
      z.string(),

    appType:
      z.string(),

    features:
      z.array(z.string()),

    entities:
      z.array(z.string()),

    integrations_requested:
      z.array(z.string()),

    assumptions:
      z.array(z.string())

  })

})

export type IntentType =
  z.infer<typeof IntentZod>