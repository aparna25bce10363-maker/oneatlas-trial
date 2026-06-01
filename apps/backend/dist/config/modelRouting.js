"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_ROUTING = void 0;
exports.MODEL_ROUTING = {
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
};
