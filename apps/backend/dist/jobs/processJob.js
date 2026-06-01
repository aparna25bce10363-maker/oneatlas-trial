"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJob = processJob;
const runIntentStage_1 = require("../pipeline/runIntentStage");
const runSchemaStage_1 = require("../pipeline/runSchemaStage");
const runAppSpecStage_1 = require("../pipeline/runAppSpecStage");
const generatePrismaSchema_1 = require("../generator/generatePrismaSchema");
const generateExpressRoutes_1 = require("../generator/generateExpressRoutes");
const generateReactPages_1 = require("../generator/generateReactPages");
const jobStore_1 = require("./jobStore");
async function processJob(jobId, prompt) {
    const job = jobStore_1.jobs[jobId];
    if (!job) {
        return;
    }
    const sendEvent = (data) => {
        job.events.push(data);
    };
    try {
        /**
         * INTENT STAGE
         */
        sendEvent({
            type: "stage_start",
            stage: "intent_extraction",
            timestamp: Date.now()
        });
        const intent = await (0, runIntentStage_1.runIntentStage)(prompt);
        console.log("INTENT RESULT:", JSON.stringify(intent, null, 2));
        sendEvent({
            type: "stage_complete",
            stage: "intent_extraction",
            timestamp: Date.now(),
            data: intent
        });
        /**
         * If intent failed stop here
         */
        if (!intent ||
            !intent.success ||
            !intent.data) {
            throw new Error("Intent stage returned no data");
        }
        /**
         * SCHEMA STAGE
         */
        sendEvent({
            type: "stage_start",
            stage: "schema_generation",
            timestamp: Date.now()
        });
        const schema = await (0, runSchemaStage_1.runSchemaStage)(intent.data);
        console.log("SCHEMA RESULT:", JSON.stringify(schema, null, 2));
        sendEvent({
            type: "stage_complete",
            stage: "schema_generation",
            timestamp: Date.now(),
            data: schema
        });
        if (!schema ||
            !schema.success) {
            throw new Error("Schema stage failed");
        }
        /**
         * APP SPEC STAGE
         */
        sendEvent({
            type: "stage_start",
            stage: "app_spec_generation",
            timestamp: Date.now()
        });
        const appSpec = await (0, runAppSpecStage_1.runAppSpecStage)(intent.data, schema.data?.entities || []);
        console.log("APP SPEC RESULT:", JSON.stringify(appSpec, null, 2));
        sendEvent({
            type: "stage_complete",
            stage: "app_spec_generation",
            timestamp: Date.now(),
            data: appSpec
        });
        /**
         * PRISMA GENERATION
         */
        sendEvent({
            type: "stage_start",
            stage: "prisma_generation",
            timestamp: Date.now()
        });
        const prismaSchema = (0, generatePrismaSchema_1.generatePrismaSchema)(schema.data?.entities || []);
        sendEvent({
            type: "stage_complete",
            stage: "prisma_generation",
            timestamp: Date.now(),
            data: prismaSchema
        });
        /**
         * EXPRESS ROUTES
         */
        sendEvent({
            type: "stage_start",
            stage: "express_generation",
            timestamp: Date.now()
        });
        const expressRoutes = (0, generateExpressRoutes_1.generateExpressRoutes)(schema.data?.entities || []);
        sendEvent({
            type: "stage_complete",
            stage: "express_generation",
            timestamp: Date.now(),
            data: expressRoutes
        });
        /**
         * REACT PAGES
         */
        sendEvent({
            type: "stage_start",
            stage: "react_generation",
            timestamp: Date.now()
        });
        const reactPages = (0, generateReactPages_1.generateReactPages)(appSpec.data?.pages || []);
        sendEvent({
            type: "stage_complete",
            stage: "react_generation",
            timestamp: Date.now(),
            data: reactPages
        });
        /**
         * COMPLETE
         */
        sendEvent({
            type: "job_complete",
            timestamp: Date.now()
        });
    }
    catch (error) {
        console.error(error);
        sendEvent({
            type: "job_failed",
            timestamp: Date.now(),
            error: error instanceof Error
                ? error.message
                : "AI generation failed"
        });
    }
}
