"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEvent = addEvent;
exports.getEvents = getEvents;
const store = {};
function addEvent(jobId, event) {
    if (!store[jobId]) {
        store[jobId] = [];
    }
    store[jobId].push(event);
}
function getEvents(jobId) {
    return store[jobId] || [];
}
