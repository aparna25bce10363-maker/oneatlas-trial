"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const jobStore_1 = require("./jobs/jobStore");
const processJob_1 = require("./jobs/processJob");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * HEALTH CHECK
 */
app.get("/health", (_, res) => {
    res.json({
        success: true,
        message: "Backend running successfully"
    });
});
/**
 * GENERATE APP
 */
app.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400)
                .json({
                success: false,
                error: "Prompt is required"
            });
        }
        const jobId = (0, crypto_1.randomUUID)();
        (0, jobStore_1.createJob)(jobId);
        (0, processJob_1.processJob)(jobId, prompt);
        return res.json({
            success: true,
            jobId
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500)
            .json({
            success: false,
            error: "Failed to start generation"
        });
    }
});
/**
 * STREAM EVENTS
 */
app.get("/stream/:jobId", (req, res) => {
    const { jobId } = req.params;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const interval = setInterval(() => {
        const job = (0, jobStore_1.getJob)(jobId);
        if (!job) {
            res.write(`data: ${JSON.stringify({
                type: "error",
                message: "Job not found"
            })}\n\n`);
            return;
        }
        while (job.events.length > 0) {
            const event = job.events.shift();
            res.write(`data: ${JSON.stringify(event)}\n\n`);
        }
    }, 1000);
    req.on("close", () => {
        clearInterval(interval);
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
