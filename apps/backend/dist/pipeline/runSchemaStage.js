"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSchemaStage = runSchemaStage;
const schemaGenerator_1 = require("./schemaGenerator");
async function runSchemaStage(intent) {
    try {
        const result = await (0, schemaGenerator_1.generateSchema)(intent);
        return {
            success: true,
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            error: "Schema generation failed"
        };
    }
}
