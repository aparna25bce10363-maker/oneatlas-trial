export const MODEL_ROUTING = {

  intent: {
    primary: "groq",
    fallback: "openai"
  },

  schema: {
    primary: "openai",
    fallback: "gemini"
  },

  appspec: {
    primary: "openai",
    fallback: "openrouter"
  }

}