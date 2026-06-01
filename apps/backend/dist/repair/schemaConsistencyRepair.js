"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairSchemaConsistency = repairSchemaConsistency;
function repairSchemaConsistency(schema) {
    const entityNames = schema.entities.map((e) => e.name);
    for (const entity of schema.entities) {
        // normalize tenant_id → tenantId
        entity.fields =
            entity.fields.map((field) => {
                if (field.name === "tenant_id") {
                    return {
                        ...field,
                        name: "tenantId",
                        isPrimary: false,
                        isUnique: false
                    };
                }
                return field;
            });
        // fix tenantId fields
        for (const field of entity.fields) {
            if (field.name === "tenantId") {
                field.isPrimary = false;
                field.isUnique = false;
            }
        }
        // ensure id field exists
        const hasId = entity.fields.some((f) => f.name === "id");
        if (!hasId) {
            entity.fields.unshift({
                name: "id",
                type: "uuid",
                nullable: false,
                isRelation: false,
                isPrimary: true,
                isUnique: true
            });
        }
        // ensure tenantId exists
        const hasTenantId = entity.fields.some((f) => f.name === "tenantId");
        if (!hasTenantId) {
            entity.fields.push({
                name: "tenantId",
                type: "uuid",
                nullable: false,
                isRelation: false,
                isPrimary: false,
                isUnique: false
            });
        }
        // remove broken relations
        entity.relations =
            entity.relations.filter((relation) => entityNames.includes(relation.target));
    }
    return schema;
}
