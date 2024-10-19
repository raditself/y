# LlamaGPT Chat Application

This is a Next.js application that integrates with LlamaGPT for an interactive chat interface.

## Deployment Instructions

1. Ensure you have a Vercel account and have installed the Vercel CLI.

2. Set up the environment variable:
   - LLAMA_GPT_API_URL: The URL of your LlamaGPT API

3. Deploy the application:
   ```
   vercel --prod
   ```

4. Follow the prompts from the Vercel CLI to complete the deployment.

5. Once deployed, Vercel will provide you with a URL for your application.

## Development

To run the application locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## Environment Variables

- LLAMA_GPT_API_URL: Set this to the URL of your LlamaGPT API. In development, it defaults to 'http://localhost:3001' if not set.

