
const API_URL = window.location.origin;

let messages = [];
let userPreferences = {
    theme: 'light',
    messageHistoryLimit: 50
};

// Load messages from local storage
function loadMessages() {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
        messages = JSON.parse(storedMessages);
        messages = messages.slice(-userPreferences.messageHistoryLimit);
        displayMessages();
    }
}

// Save messages to local storage
function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messages.slice(-userPreferences.messageHistoryLimit)));
}

// Display messages in the chat container
function displayMessages() {
    const chatContainer = document.getElementById('chat-messages');
    chatContainer.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;
        messageElement.textContent = message.text;
        chatContainer.appendChild(messageElement);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Show loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Send message to the AI model
async function sendMessage(message, type = 'text') {
    showLoading();
    messages.push({ sender: 'user', text: message });
    displayMessages();

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, type }),
        });

        if (!response.ok) {
            throw new Error('Failed to get response from the server');
        }

        const data = await response.json();
        messages.push({ sender: 'ai', text: data.response });
        displayMessages();
        saveMessages();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your message. Please try again.');
    } finally {
        hideLoading();
    }
}

// Handle file upload
function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        sendMessage(`[File uploaded: ${file.name}]`, 'file');
    };
    reader.readAsDataURL(file);
}

// Handle voice input
function handleVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('message-input').value = transcript;
        };

        recognition.start();
    } else {
        alert('Speech recognition is not supported in your browser.');
    }
}

// Toggle theme
function toggleTheme() {
    userPreferences.theme = userPreferences.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

// Load user preferences
function loadUserPreferences() {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
        userPreferences = JSON.parse(storedPreferences);
        if (userPreferences.theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Event listeners
document.getElementById('send-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('send-btn').click();
    }
});

document.getElementById('file-btn').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

document.getElementById('voice-btn').addEventListener('click', handleVoiceInput);

// Load messages and user preferences when the page loads
window.addEventListener('load', () => {
    loadUserPreferences();
    loadMessages();
});

// WebSocket connection
const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    messages.push({ sender: 'ai', text: data.message });
    displayMessages();
    saveMessages();
};

// Simple custom model for demonstration purposes
async function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 10, inputShape: [1], activation: 'relu'}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
    
    // Train the model with more complex data
    const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [10, 1]);
    const ys = tf.tensor2d([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], [10, 1]);
    await model.fit(xs, ys, {epochs: 200, callbacks: {
        onEpochEnd: (epoch, logs) => console.log(`Epoch ${epoch}: loss = ${logs.loss}`)
    }});
    
    return model;
}
