import { generateSchema }
from "./schemaGenerator"

export async function runSchemaStage(
  intent: any
) {

  try {

    const result =
      await generateSchema(intent)

    return {

      success: true,

      data: result

    }

  } catch (error) {

    return {

      success: false,

      error:
        "Schema generation failed"

    }

  }

}