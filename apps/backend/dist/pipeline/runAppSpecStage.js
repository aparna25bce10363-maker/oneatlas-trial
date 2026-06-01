"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAppSpecStage = runAppSpecStage;
const appSpecGenerator_1 = require("./appSpecGenerator");
const appSpecValidator_1 = require("../validators/appSpecValidator");
async function runAppSpecStage(intent, entities) {
    const integrationsRequested = intent?.integrations_requested || [];
    const schema = {
        entities
    };
    const result = await (0, appSpecGenerator_1.generateAppSpec)(schema, integrationsRequested);
    console.log("APP SPEC RAW RESULT:", JSON.stringify(result, null, 2));
    const validation = appSpecValidator_1.AppSpecZod.safeParse(result);
    if (!validation.success) {
        console.log("APP SPEC VALIDATION ERROR:", validation.error.issues);
        return {
            success: false,
            errors: validation.error.issues
        };
    }
    return {
        success: true,
        data: validation.data
    };
}
