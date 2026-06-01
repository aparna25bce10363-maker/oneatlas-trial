import type { IntentType } from "../types/intent"

export function repairIntentFields(
  data: Partial<IntentType>
): IntentType {

  return {

    success:
      data.success ?? true,

    data: {

      appName:
        data.data?.appName ||
        "Untitled App",

      appType:
        data.data?.appType ||
        "custom",

      features:
        data.data?.features || [],

      entities:
        data.data?.entities || [],

      integrations_requested:
        data.data?.integrations_requested || [],

      assumptions:
        data.data?.assumptions || [
          "Default assumptions applied"
        ]

    }

  }

}