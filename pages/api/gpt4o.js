import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export const config = {
  api: {
    bodyParser: true, // Use bodyParser to handle JSON
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image not provided' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "You are a receipt scanner assistant that rates purchases based on sustainability for VISA EcoEarn. Please provide an overall purchase eco-rating out of 100 (100 being the most sustainable) based on the items in this receipt and their sustainability scoring. Answer in a single concise paragraph in plaintext with no styling, no lists, no bullets, no line breaks." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`, // Construct the base64 data URL
              },
            },
          ],
        },
      ],
    });

    const responseMessage = response.choices[0].message.content;
    res.status(200).json({ response: responseMessage });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
}
