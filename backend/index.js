const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

// WebSocket Connection Handling
wss.on("connection", (ws) => {
    console.log("✅ New WebSocket connection established.");

    ws.on("message", (message) => {
        console.log("📩 Received:", message.toString());
        ws.send(message.toString()); // Echo message back
    });

    ws.on("close", () => {
        console.log("❌ Client disconnected.");
    });
});
