import { extractIntent }
from "../pipeline/intentExtractor"

export async function runIntentStage(
  prompt: string
) {

  const result =
    await extractIntent(prompt)

  console.log(
  "RUN INTENT RESULT:",
  JSON.stringify(
    result,
    null,
    2
  )
) 

  if (!result.success) {

    return {

      success: false,

      error:
        "Intent extraction failed"

    }

  }

  return {

    success: true,

    data: result.data

  }

}