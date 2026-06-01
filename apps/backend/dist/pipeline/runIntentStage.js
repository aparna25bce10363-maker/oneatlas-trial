"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIntentStage = runIntentStage;
const intentExtractor_1 = require("../pipeline/intentExtractor");
async function runIntentStage(prompt) {
    const result = await (0, intentExtractor_1.extractIntent)(prompt);
    console.log("RUN INTENT RESULT:", JSON.stringify(result, null, 2));
    if (!result.success) {
        return {
            success: false,
            error: "Intent extraction failed"
        };
    }
    return {
        success: true,
        data: result.data
    };
}
