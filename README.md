# AI Chatbot Application with LlamaGPT Integration

This project integrates LlamaGPT with a Next.js application for deployment on Vercel, providing an interactive chat interface where users can communicate with an AI model.

## Features

- Enhanced UI with responsive design
- Support for text messages, file uploads, and voice input
- Real-time updates using WebSockets
- User preferences (theme selection and message history limit)
- LlamaGPT model integration
- Message persistence using local storage
- Error handling for AI model responses

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/raditself/y.git
   cd y
   ```
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env.local` file with `LLAMA_GPT_API_URL=http://your-llama-gpt-api-url`
   - Add the following secrets to your GitHub repository:
     - VERCEL_TOKEN
     - VERCEL_ORG_ID
     - VERCEL_PROJECT_ID
4. Push changes to the `main` branch to trigger automatic deployment to Vercel

## Development

Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Usage

- Type your message in the input field and press "Send" or hit Enter to send a text message.
- Click the paperclip icon to upload a file.
- Click the microphone icon to use voice input (if supported by your browser).
- Use the theme toggle to switch between light and dark modes.

## Deployment

The project is set up for automatic deployment to Vercel when changes are pushed to the `main` branch.

## Future Improvements

1. Enhance file processing capabilities for various file types.
2. Implement user authentication and personalized chat history.
3. Add support for rich media in chat messages (e.g., images, videos).
4. Improve accessibility features.

## Need Help?

If you encounter any issues or have questions, please open an issue in this repository.

Thank you for using our AI chatbot application with LlamaGPT integration. We hope you enjoy the enhanced features!
