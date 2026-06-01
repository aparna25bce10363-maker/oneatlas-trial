import Groq from "groq-sdk"

const groq = new Groq({

  apiKey: process.env.GROQ_API_KEY

})

export async function generateWithAI(

  provider: string,
  prompt: string

) {

  if (provider === "groq") {

    const completion = await groq.chat.completions.create({

      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.2

    })

    return {

      success: true,
      
      content:
        completion.choices[0]?.message?.content

    }

  }

  throw new Error("Unsupported provider")

}