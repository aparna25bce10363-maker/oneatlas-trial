"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchema = generateSchema;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
async function generateSchema(intent) {
    const prompt = `

You are a senior database architect.

Convert this SaaS specification into a production-ready PostgreSQL schema.

INPUT:

${JSON.stringify(intent, null, 2)}

REQUIREMENTS:

Create entities based on the app features
Every entity must have:
id
createdAt
updatedAt
Add proper relationships
Add foreign keys
Add primary keys
Add nullable flags
Add unique constraints where needed
Return ONLY JSON
NO markdown
NO explanations
NO code fences

Output format:

{
"entities": [
{
"name": "User",
"tableName": "users",
"fields": [
{
"name": "id",
"type": "integer",
"primaryKey": true,
"nullable": false
}
],
"relations": []
}
]
}

`;
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        messages: [
            {
                role: "system",
                content: "You are a database architect. Return valid JSON only."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });
    const raw = response.choices[0]
        ?.message?.content || "{}";
    console.log("SCHEMA RAW RESPONSE:\n", raw);
    try {
        let cleaned = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const firstBrace = cleaned.indexOf("{");
        const lastBrace = cleaned.lastIndexOf("}");
        if (firstBrace !== -1 &&
            lastBrace !== -1) {
            cleaned =
                cleaned.slice(firstBrace, lastBrace + 1);
        }
        const parsed = JSON.parse(cleaned);
        console.log("SCHEMA PARSED:\n", JSON.stringify(parsed, null, 2));
        return parsed;
    }
    catch (error) {
        console.error("SCHEMA PARSE ERROR:");
        console.error(error);
        console.log("FAILED RAW RESPONSE:\n", raw);
        return {
            entities: []
        };
    }
}
