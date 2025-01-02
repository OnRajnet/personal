import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const config = {
  runtime: 'edge',
  regions: 'all' // Optional: deploy to all regions
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const to = formData.get("recipient") as string | null;
  const subject = formData.get("subject") as string | null;
  // const message = formData.get("message") as string | null;

  if (!to || !subject) { //|| !message) {
    return new Response(JSON.stringify({ error: "Missing email" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    await sendEmail({ to, subject });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};