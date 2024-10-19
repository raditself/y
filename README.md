# LlamaGPT Integration

This project integrates LlamaGPT with a Next.js application for deployment on Vercel.

## Setup

1. Clone the repository
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

## Deployment

The project is set up for automatic deployment to Vercel when changes are pushed to the `main` branch.

