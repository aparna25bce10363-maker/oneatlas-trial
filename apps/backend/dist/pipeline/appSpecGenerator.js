"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAppSpec = generateAppSpec;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
async function generateAppSpec(schema, integrationsRequested) {
    const prompt = `
You are an expert SaaS architect.

Generate a production-ready app specification JSON
for the following schema.

Schema:
${JSON.stringify(schema, null, 2)}

Integrations:
${JSON.stringify(integrationsRequested, null, 2)}

The JSON must EXACTLY match this schema:

{
  "pages": [
    {
      "name": "string",
      "route": "string",
      "layout": "string",
      "entity": "string",
      "components": ["string"]
    }
  ],

  "apiEndpoints": [
    {
      "path": "string",
      "method": "GET",
      "handler": "string",
      "entity": "string",
      "authRequired": true,
      "rateLimited": true
    }
  ],

  "authRules": [
    {
      "role": "admin",
      "permissions": [
        {
          "entity": "User",
          "read": true,
          "write": true,
          "delete": true
        }
      ]
    }
  ],

  "workflowStubs": [
    {
      "name": "string",
      "trigger": {
        "entity": "string",
        "event": "created",
        "condition": "optional"
      },
      "integration": "OpenAI",
      "action": "string",
      "payload": {}
    }
  ]
}

Rules:

1. Create CRUD pages
2. Create REST API endpoints
3. Create role permissions
4. Create workflow automations
5. Keep everything scalable
6. Every page MUST include:
   - name
   - route
   - layout
   - entity
   - components
7. Every API endpoint MUST include:
   - path
   - method
   - handler
   - entity
   - authRequired
   - rateLimited
8. Every auth rule MUST include:
   - role
   - permissions
9. Every workflow MUST include:
   - name
   - trigger
   - integration
   - action
   - payload
10. Return ONLY valid JSON
11. Do not wrap the response in markdown
12. Do not include explanations

Return ONLY valid JSON.
`;
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        messages: [
            {
                role: "system",
                content: "You generate strict JSON only.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    const content = response.choices[0]?.message?.content || "{}";
    console.log("APP SPEC RAW:");
    console.log(content);
    const cleaned = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    console.log("APP SPEC CLEANED:");
    console.log(cleaned);
    try {
        return JSON.parse(cleaned);
    }
    catch (error) {
        console.error("Failed to parse app spec:", error);
        return {
            pages: [],
            apiEndpoints: [],
            authRules: [],
            workflowStubs: [],
        };
    }
}
