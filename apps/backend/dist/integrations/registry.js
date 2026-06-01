"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationRegistry = void 0;
exports.integrationRegistry = [
    {
        id: "slack",
        displayName: "Slack",
        authType: "oauth2",
        triggers: [
            "record_created",
            "status_changed"
        ],
        actions: [
            "send_message",
            "send_dm"
        ]
    },
    {
        id: "whatsapp",
        displayName: "WhatsApp",
        authType: "api_key",
        triggers: [
            "status_changed",
            "record_created"
        ],
        actions: [
            "send_template_message",
            "send_notification"
        ]
    },
    {
        id: "gmail",
        displayName: "Gmail",
        authType: "oauth2",
        triggers: [
            "record_created"
        ],
        actions: [
            "send_email"
        ]
    },
    {
        id: "stripe",
        displayName: "Stripe",
        authType: "api_key",
        triggers: [
            "payment_created"
        ],
        actions: [
            "create_customer"
        ]
    },
    {
        id: "jira",
        displayName: "Jira",
        authType: "oauth2",
        triggers: [
            "task_created"
        ],
        actions: [
            "create_issue"
        ]
    }
];
