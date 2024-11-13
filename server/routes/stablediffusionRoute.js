// stableDiffusionRoute.js
import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

// API 키 확인
const API_KEY = process.env.HUGGINGFACE_API_KEY;
if (!API_KEY) {
    console.error('HUGGINGFACE_API_KEY is not set in .env file');
}

router.route('/').get((req, res) => {
    res.send('Stable Diffusion API is running');
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log('Generating image for prompt:', prompt);
        console.log('Using API key:', API_KEY ? 'API key is set' : 'API key is missing');

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    inputs: prompt,
                    options: {
                        wait_for_model: true
                    }
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Hugging Face API error:', errorData);
            throw new Error(`API request failed: ${errorData}`);
        }

        const buffer = await response.buffer();
        const base64Image = buffer.toString('base64');
        
        return res.status(200).json({ photo: base64Image });
    } catch (error) {
        console.error('Detailed error:', error);
        return res.status(500).json({ 
            error: error.message,
            details: error.toString()
        });
    }
});

export default router;