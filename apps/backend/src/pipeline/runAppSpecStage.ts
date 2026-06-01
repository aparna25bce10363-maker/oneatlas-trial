import { generateAppSpec }
from "./appSpecGenerator"

import { AppSpecZod }
from "../validators/appSpecValidator"

export async function runAppSpecStage(

  intent: any,

  entities: any[]

) {

const integrationsRequested =
  intent?.integrations_requested || []

  const schema = {

    entities

  }

  const result =
    await generateAppSpec(

      schema,

      integrationsRequested

    )

  console.log(
    "APP SPEC RAW RESULT:",
    JSON.stringify(
      result,
      null,
      2
    )
  )

  const validation =
    AppSpecZod.safeParse(result)

  if (!validation.success) {

    console.log(
      "APP SPEC VALIDATION ERROR:",
      validation.error.issues
    )

    return {

      success: false,

      errors:
        validation.error.issues

    }

  }

  return {

    success: true,

    data: validation.data

  }

}