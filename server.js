
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Create HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: message.toString() }));
            }
        });
    });
});

// Simple AI model response (replace with actual AI integration later)
function getAIResponse(message, type) {
    if (type === 'file') {
        return `I've received your file: ${message}. I can process this type of data.`;
    }
    return `AI response to: ${message}`;
}

// Chat route
app.post('/chat', upload.single('file'), async (req, res) => {
    try {
        const message = req.body.message || (req.file ? req.file.originalname : '');
        const type = req.file ? 'file' : 'text';

        if (!message) {
            return res.status(400).json({ error: 'Message or file is required' });
        }

        const aiResponse = getAIResponse(message, type);
        res.json({ response: aiResponse });

        // Broadcast message to all WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: aiResponse }));
            }
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'An error occurred while processing your message' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
