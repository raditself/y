

const API_URL = window.location.origin;

let messages = [];

// Load messages from local storage
function loadMessages() {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
        messages = JSON.parse(storedMessages);
        displayMessages();
    }
}

// Save messages to local storage
function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
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
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        showLoading();
        messages.push({ sender: 'user', text: message });
        displayMessages();
        messageInput.value = '';

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
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
}

// Event listener for send button
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Event listener for Enter key in message input
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Load messages when the page loads
window.addEventListener('load', loadMessages);

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


async function getAIResponse(input) {
    const inputTensor = tf.tensor2d([input.length], [1, 1]);
    const prediction = await model.predict(inputTensor).data();
    const response = `AI response: Your input length is ${input.length}, and the predicted value is ${prediction[0].toFixed(2)}`;
    return response;
}


async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        try {
            addMessage(message, true);
            userInput.value = '';
            
            const aiResponse = await getAIResponse(message);
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, an error occurred. Please try again.', false);
        }
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


function logout() {
    token = null;
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
    alert('Logged out successfully');
}


function showProfile() {
    document.getElementById('chat-container').style.display = 'none';
    document.getElementById('profile-container').style.display = 'block';
    document.getElementById('profile-username').textContent = localStorage.getItem('username');
}

function showChat() {
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
            localStorage.setItem('username', username);
}

async function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (!validatePassword(newPassword)) {
        alert('New password does not meet the strength requirements');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
        } else {
            alert(data.message || 'Failed to change password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while changing the password');
    }
}
