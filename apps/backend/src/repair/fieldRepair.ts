import { AppIntent } from "../types/intent"

export function repairIntentFields(

  data: Partial<AppIntent>

): AppIntent {

  return {

    appName:
      data.appName || "Untitled App",

    appType:
      data.appType || "custom",

    features:
      data.features || [],

    entities:
      data.entities || [],

    integrations_requested:
      data.integrations_requested || [],

    assumptions:
      data.assumptions || [
        "Default assumptions applied"
      ]

  }

}