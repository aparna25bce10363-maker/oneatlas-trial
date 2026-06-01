"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentValidator = void 0;
const zod_1 = require("zod");
exports.IntentValidator = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.object({
        appName: zod_1.z.string(),
        appType: zod_1.z.string(),
        features: zod_1.z.array(zod_1.z.string()),
        entities: zod_1.z.array(zod_1.z.string()),
        integrations_requested: zod_1.z.array(zod_1.z.string()),
        assumptions: zod_1.z.array(zod_1.z.string())
    })
});
