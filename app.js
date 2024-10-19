
function validateUsername(username) {
    return username.length >= 3;
}

function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}

function validateInput(username, password) {
    if (!validateUsername(username)) {
        alert('Username must be at least 3 characters long');
        return false;
    }
    if (!validatePassword(password)) {
        alert('Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter');
        return false;
    }
    return true;
}

const API_URL = window.location.origin;

let token = null;

async function register() {
    if (!validateInput(username, password)) {
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        if (response.ok) {
            alert(data.message || 'Registration successful');
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
}

async function login() {
    if (!validateInput(username, password)) {
        return;
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        if (response.ok && data.token) {
            token = data.token;
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('chat-container').style.display = 'block';
            localStorage.setItem('username', username);
            alert('Login successful');
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('login-btn').addEventListener('click', login);


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
