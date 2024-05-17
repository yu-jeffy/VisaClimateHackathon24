import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a customer assistant for a grocery chain. You are recommending recipes based on items in cart. Respond ONLY in plaintext paragraphs prose. You do not have access to any formatting in your response including /n or lists or bullets. Be helpful, casual, friendly, respectful." },
                { role: "user", content: prompt }
                ],
                model: "gpt-3.5-turbo",
            });
            console.log(completion.choices[0].message.content);
            const recipes = JSON.stringify(completion.choices[0].message.content);

            res.status(200).send({ recipes });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch recipes here' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}