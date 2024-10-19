
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LLAMA_GPT_API_URL: process.env.LLAMA_GPT_API_URL,
  },
}

module.exports = nextConfig
