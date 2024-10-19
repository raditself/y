
import axios from 'axios';

const LLAMA_GPT_API_URL = process.env.LLAMA_GPT_API_URL || 'http://localhost:3001';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const response = await axios.post(`${LLAMA_GPT_API_URL}/v1/chat/completions`, {
        model: "llama2",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      });
      
      const aiMessage = response.data.choices[0].message.content;
      res.status(200).json({ message: aiMessage });
    } catch (error) {
      console.error('Error calling LlamaGPT API:', error);
      res.status(500).json({ message: 'Error processing your request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
