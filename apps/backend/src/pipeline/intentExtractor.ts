import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function extractIntent(
  prompt: string
) {

  try {

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",
            content: `
You are an expert SaaS architect.

Return ONLY valid JSON.

Example:

{
  "app_name": "StudyAI",
  "description": "AI learning platform",
  "entities": ["User","Quiz"],
  "integrations_requested": [
    "OpenAI",
    "Stripe"
  ]
}
`
          },

          {
            role: "user",
            content: prompt
          }

        ],

        temperature: 0.2

      })

    const content =
      completion.choices[0]
        ?.message?.content || ""

    console.log("RAW GROQ RESPONSE:")
    console.log(content)

    const cleaned =

      content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    console.log("CLEANED RESPONSE:")
    console.log(cleaned)

    const parsed =
      JSON.parse(cleaned)

    console.log("PARSED INTENT:")
    console.log(parsed)

    return {

      success: true,

      data: parsed

    }

  } catch (error) {

    console.error(
      "GROQ ERROR:",
      error
    )

    return {

      success: false,

      data: null

    }

  }

}