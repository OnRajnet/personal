import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";
import { isValidEmail } from "../../utils/isValidEmail";

export const prerender = false;

// Add response headers helper
const createResponse = (body: object, status: number) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const to = formData.get("recipient") as string;
    const subject = formData.get("subject") as string;

    // Validate inputs early
    if (!to || !subject) {
      return createResponse({ error: "Missing required fields" }, 400);
    }

    // Validate email format
    if (!isValidEmail(to)) {
      return createResponse({ error: "Invalid email format" }, 400);
    }

    // Send email with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Email sending timeout')), 5000);
    });

    const emailPromise = sendEmail({ to, subject });
    await Promise.race([emailPromise, timeoutPromise]);

    return createResponse({ success: true }, 200);

  } catch (error) {
    console.error('Email sending error:', error);
    const message = error instanceof Error ? error.message : "Failed to send email";
    return createResponse({ error: message }, 500);
  }
};