import { runIntentStage }
from "./runIntentStage"

import { runSchemaStage }
from "./runSchemaStage"

import { runAppSpecStage }
from "./runAppSpecStage"

export async function runCompilerPipeline(

  prompt: string

) {

  /**
   * STAGE 1
   * INTENT EXTRACTION
   */

  const intent =
    await runIntentStage(prompt)

  if (!intent.success) {

    return {

      success: false,

      stage: "intent_extraction",

      error:
        "Intent extraction failed"

    }

  }

  /**
   * STAGE 2
   * SCHEMA GENERATION
   */

  const schema =
    await runSchemaStage(
      intent.data
    )

  if (!schema.success) {

    return {

      success: false,

      stage: "schema_generation",

      error:
        "Schema generation failed"

    }

  }

  /**
   * STAGE 3
   * APP SPEC GENERATION
   */

  const appSpec =
    await runAppSpecStage(

      intent.data,

      schema.data?.entities || []

    )

  if (!appSpec.success) {

    return {

      success: false,

      stage: "app_spec_generation",

      error:
        "App spec generation failed"

    }

  }

  /**
   * FINAL RESPONSE
   */

  return {

    success: true,

    intent,

    schema,

    appSpec

  }

}