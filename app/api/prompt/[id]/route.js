import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const {prompt, tag} = await request.json();
  try {
    await connectToDatabase();
    
    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response("Failed to update prompt.", {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch prompts", {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted!', {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to delete prompt.", {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
