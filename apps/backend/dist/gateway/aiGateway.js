"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWithAI = generateWithAI;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
async function generateWithAI(provider, prompt) {
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
        });
        return {
            success: true,
            content: completion.choices[0]?.message?.content
        };
    }
    throw new Error("Unsupported provider");
}
