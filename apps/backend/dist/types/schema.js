"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaZod = exports.EntityZod = exports.RelationZod = exports.FieldZod = void 0;
const zod_1 = require("zod");
exports.FieldZod = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    nullable: zod_1.z.boolean(),
    isRelation: zod_1.z.boolean(),
    isPrimary: zod_1.z.boolean(),
    isUnique: zod_1.z.boolean()
});
exports.RelationZod = zod_1.z.object({
    type: zod_1.z.enum([
        "hasMany",
        "belongsTo",
        "hasOne"
    ]),
    target: zod_1.z.string(),
    foreignKey: zod_1.z.string(),
    onDelete: zod_1.z.string()
});
exports.EntityZod = zod_1.z.object({
    name: zod_1.z.string(),
    tableName: zod_1.z.string(),
    fields: zod_1.z.array(exports.FieldZod),
    relations: zod_1.z.array(exports.RelationZod)
});
exports.SchemaZod = zod_1.z.object({
    entities: zod_1.z.array(exports.EntityZod)
});
