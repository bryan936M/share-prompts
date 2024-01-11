import { revalidatePath } from "next/cache";

export async function POST(request) {
  const body = await request.json();
  const path = body.path;

  if (path) {
    revalidatePath(path);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}