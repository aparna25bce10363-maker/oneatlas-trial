"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCompilerPipeline = runCompilerPipeline;
const runIntentStage_1 = require("./runIntentStage");
const runSchemaStage_1 = require("./runSchemaStage");
const runAppSpecStage_1 = require("./runAppSpecStage");
async function runCompilerPipeline(prompt) {
    /**
     * STAGE 1
     * INTENT EXTRACTION
     */
    const intent = await (0, runIntentStage_1.runIntentStage)(prompt);
    if (!intent.success) {
        return {
            success: false,
            stage: "intent_extraction",
            error: "Intent extraction failed"
        };
    }
    /**
     * STAGE 2
     * SCHEMA GENERATION
     */
    const schema = await (0, runSchemaStage_1.runSchemaStage)(intent.data);
    if (!schema.success) {
        return {
            success: false,
            stage: "schema_generation",
            error: "Schema generation failed"
        };
    }
    /**
     * STAGE 3
     * APP SPEC GENERATION
     */
    const appSpec = await (0, runAppSpecStage_1.runAppSpecStage)(intent.data, schema.data?.entities || []);
    if (!appSpec.success) {
        return {
            success: false,
            stage: "app_spec_generation",
            error: "App spec generation failed"
        };
    }
    /**
     * FINAL RESPONSE
     */
    return {
        success: true,
        intent,
        schema,
        appSpec
    };
}
