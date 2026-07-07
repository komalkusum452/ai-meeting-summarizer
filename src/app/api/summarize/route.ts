import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
     contents: `
You are an AI meeting assistant.

Analyze this meeting transcript:

${transcript}

Return ONLY valid JSON in this format:

{
  "summary": "short executive summary",
  "decisions": [
    "decision 1",
    "decision 2"
  ],
  "actionItems": [
    {
      "task": "task description",
      "owner": "person responsible"
    }
  ],
  "sentiment": "positive/neutral/negative",
  "topics": [
    "topic 1",
    "topic 2"
  ]
}
` });


    const cleanJson = response.text
  .replace("```json", "")
  .replace("```", "")
  .trim();

return Response.json({
  result: JSON.parse(cleanJson),
});


  } catch (error) {

    console.error("GEMINI ERROR:", error);

    return Response.json(
      {
        error: "Failed to analyze transcript",
      },
      {
        status: 500,
      }
    );
  }
}