import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (req) => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch prompts', {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};