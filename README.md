# LlamaGPT Integration

This project integrates LlamaGPT with a Next.js application for deployment on Vercel, providing an interactive chat interface.

## Deployment Instructions

1. Fork this repository to your GitHub account.
2. Sign up for a Vercel account if you haven't already.
3. In Vercel, create a new project and link it to your forked GitHub repository.
4. In the Vercel project settings, add the following environment variable:
   - LLAMA_GPT_API_URL: The URL of your LlamaGPT API
5. Deploy the project.

Note: Ensure that your LlamaGPT API is accessible from the Vercel deployment.

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the root directory with:
   LLAMA_GPT_API_URL=https://your-llama-gpt-api-url.com
4. Run the development server: `npm run dev`
5. Open http://localhost:3000 in your browser

## Environment Variables

- LLAMA_GPT_API_URL: The URL of your LlamaGPT API
