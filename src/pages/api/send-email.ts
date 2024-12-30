import type { APIRoute } from "astro";
import { sendEmail } from "../../utils/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const to = formData.get("recipient") as string | null;
  const subject = formData.get("subject") as string | null;
  // const message = formData.get("message") as string | null;

  // Throw an error if we're missing any of the needed fields.
  if (!to || !subject) { //|| !message) {
    throw new Error("Missing required fields");
  }

  // Try to send the email using a `sendEmail` function we'll create next. Throw
  // an error if it fails.
  try {
    // const html = `<div>${message}</div>`;
    cookies.set("status", "Email byl odeslán.", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    await sendEmail({ to, subject });
  } catch (error) {
    cookies.set("status", "Něco se pokazilo!!!", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    throw new Error("Failed to send email");
  }

  // Redirect the user to a success page after the email is sent.
  // TODO: do not redirect, just send email and show success message
  return redirect("/");
};