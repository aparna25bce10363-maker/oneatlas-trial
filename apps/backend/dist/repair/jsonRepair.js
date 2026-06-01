"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairJSON = repairJSON;
function repairJSON(raw) {
    let repaired = raw.trim();
    // remove markdown blocks
    repaired = repaired.replace(/```json/g, "");
    repaired = repaired.replace(/```/g, "");
    // remove trailing commas
    repaired = repaired.replace(/,\s*}/g, "}");
    repaired = repaired.replace(/,\s*]/g, "]");
    return repaired;
}
