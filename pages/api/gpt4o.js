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
            { type: "text", text: "Please provide an overall purchase eco-rating based on the items in this receipt and their sustainability scoring." },
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
