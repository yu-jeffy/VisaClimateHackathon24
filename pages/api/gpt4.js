import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { system_prompt, user_prompt } = req.body;

    if (!system_prompt || !user_prompt) {
        return res.status(400).json({ error: 'Missing system_prompt or user_prompt' });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: system_prompt }, { role: "user", content: user_prompt }],
            model: "gpt-4o",
          });
        
          console.log(completion.choices[0]);

        const responseMessage = completion.choices[0].message.content;
        res.status(200).json({ response: responseMessage });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'Error calling OpenAI API' });
    }
}
