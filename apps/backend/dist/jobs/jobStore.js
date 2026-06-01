"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = void 0;
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.getJob = getJob;
exports.jobs = {};
/**
 * Create New Job
 */
function createJob(jobId) {
    exports.jobs[jobId] = {
        id: jobId,
        status: "pending",
        events: []
    };
}
/**
 * Update Existing Job
 */
function updateJob(jobId, data) {
    if (!exports.jobs[jobId]) {
        return;
    }
    exports.jobs[jobId] = {
        ...exports.jobs[jobId],
        ...data
    };
}
/**
 * Get Job
 */
function getJob(jobId) {
    return exports.jobs[jobId];
}
