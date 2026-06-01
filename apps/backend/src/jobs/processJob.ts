import { runIntentStage }
from "../pipeline/runIntentStage"

import { runSchemaStage }
from "../pipeline/runSchemaStage"

import { runAppSpecStage }
from "../pipeline/runAppSpecStage"

import { generatePrismaSchema }
from "../generator/generatePrismaSchema"

import { generateExpressRoutes }
from "../generator/generateExpressRoutes"

import { generateReactPages }
from "../generator/generateReactPages"

import { jobs }
from "./jobStore"

export async function processJob(

  jobId: string,

  prompt: string

) {

  const job = jobs[jobId]

  if (!job) {
    return
  }

  const sendEvent = (
    data: any
  ) => {

    job.events.push(data)

  }

  try {

    /**
     * INTENT STAGE
     */

    sendEvent({

      type: "stage_start",

      stage: "intent_extraction",

      timestamp: Date.now()

    })

    const intent =
      await runIntentStage(prompt)

    console.log(
      "INTENT RESULT:",
      JSON.stringify(intent, null, 2)
    )

    sendEvent({

      type: "stage_complete",

      stage: "intent_extraction",

      timestamp: Date.now(),

      data: intent

    })

    /**
     * If intent failed stop here
     */

    if (

      !intent ||

      !intent.success ||

      !intent.data

    ) {

      throw new Error(
        "Intent stage returned no data"
      )

    }

    /**
     * SCHEMA STAGE
     */

    sendEvent({

      type: "stage_start",

      stage: "schema_generation",

      timestamp: Date.now()

    })

    const schema =
      await runSchemaStage(
        intent.data
      )

    console.log(
      "SCHEMA RESULT:",
      JSON.stringify(schema, null, 2)
    )

    sendEvent({

      type: "stage_complete",

      stage: "schema_generation",

      timestamp: Date.now(),

      data: schema

    })

    if (

      !schema ||

      !schema.success

    ) {

      throw new Error(
        "Schema stage failed"
      )

    }

    /**
     * APP SPEC STAGE
     */

    sendEvent({

      type: "stage_start",

      stage: "app_spec_generation",

      timestamp: Date.now()

    })

    const appSpec =
      await runAppSpecStage(

        intent.data,

        schema.data?.entities || []

      )

    console.log(
      "APP SPEC RESULT:",
      JSON.stringify(appSpec, null, 2)
    )

    sendEvent({

      type: "stage_complete",

      stage: "app_spec_generation",

      timestamp: Date.now(),

      data: appSpec

    })

    /**
     * PRISMA GENERATION
     */

    sendEvent({

      type: "stage_start",

      stage: "prisma_generation",

      timestamp: Date.now()

    })

    const prismaSchema =
      generatePrismaSchema(

        schema.data?.entities || []

      )

    sendEvent({

      type: "stage_complete",

      stage: "prisma_generation",

      timestamp: Date.now(),

      data: prismaSchema

    })

    /**
     * EXPRESS ROUTES
     */

    sendEvent({

      type: "stage_start",

      stage: "express_generation",

      timestamp: Date.now()

    })

    const expressRoutes =
      generateExpressRoutes(

        schema.data?.entities || []

      )

    sendEvent({

      type: "stage_complete",

      stage: "express_generation",

      timestamp: Date.now(),

      data: expressRoutes

    })

    /**
     * REACT PAGES
     */

    sendEvent({

      type: "stage_start",

      stage: "react_generation",

      timestamp: Date.now()

    })

    const reactPages =
      generateReactPages(

        appSpec.data?.pages || []

      )

    sendEvent({

      type: "stage_complete",

      stage: "react_generation",

      timestamp: Date.now(),

      data: reactPages

    })

    /**
     * COMPLETE
     */

    sendEvent({

      type: "job_complete",

      timestamp: Date.now()

    })

  } catch (error) {

    console.error(error)

    sendEvent({

      type: "job_failed",

      timestamp: Date.now(),

      error:
        error instanceof Error
          ? error.message
          : "AI generation failed"

    })

  }

}