import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();
  if (!prompt || !userId || !tag) {
    return new Response(JSON.stringify("Missing prompt, userId, or tag"), {
      status: 400,
    });
  }
  console.log(prompt, userId, tag)
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify("Failed to create a new prompt"), {
      status: 500,
    });
  }
};
