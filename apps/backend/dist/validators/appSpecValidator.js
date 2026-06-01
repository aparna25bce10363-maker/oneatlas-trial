"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSpecZod = void 0;
const zod_1 = require("zod");
exports.AppSpecZod = zod_1.z.object({
    pages: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        route: zod_1.z.string(),
        layout: zod_1.z.string(),
        entity: zod_1.z.string(),
        components: zod_1.z.array(zod_1.z.string())
    })),
    apiEndpoints: zod_1.z.array(zod_1.z.object({
        path: zod_1.z.string(),
        method: zod_1.z.string(),
        handler: zod_1.z.string(),
        entity: zod_1.z.string(),
        authRequired: zod_1.z.boolean(),
        rateLimited: zod_1.z.boolean()
    })),
    authRules: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.string(),
        permissions: zod_1.z.array(zod_1.z.object({
            entity: zod_1.z.string(),
            read: zod_1.z.boolean(),
            write: zod_1.z.boolean(),
            delete: zod_1.z.boolean()
        }))
    })),
    workflowStubs: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        trigger: zod_1.z.object({
            entity: zod_1.z.string(),
            event: zod_1.z.string(),
            condition: zod_1.z.string().optional()
        }),
        integration: zod_1.z.string(),
        action: zod_1.z.string(),
        payload: zod_1.z.record(zod_1.z.string(), zod_1.z.any())
    }))
});
