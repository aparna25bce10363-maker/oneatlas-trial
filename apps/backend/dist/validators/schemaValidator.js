"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = exports.EntityValidator = exports.RelationValidator = exports.FieldValidator = void 0;
const zod_1 = require("zod");
exports.FieldValidator = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    nullable: zod_1.z.boolean(),
    isRelation: zod_1.z.boolean(),
    isPrimary: zod_1.z.boolean(),
    isUnique: zod_1.z.boolean()
});
exports.RelationValidator = zod_1.z.object({
    type: zod_1.z.enum([
        "hasMany",
        "belongsTo",
        "hasOne"
    ]),
    target: zod_1.z.string(),
    foreignKey: zod_1.z.string(),
    onDelete: zod_1.z.string()
});
exports.EntityValidator = zod_1.z.object({
    name: zod_1.z.string(),
    tableName: zod_1.z.string(),
    fields: zod_1.z.array(exports.FieldValidator),
    relations: zod_1.z.array(exports.RelationValidator)
});
exports.SchemaValidator = zod_1.z.object({
    entities: zod_1.z.array(exports.EntityValidator)
});
