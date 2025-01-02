import { Resend } from 'resend';
import { renderEmailTemplate } from './renderEmailTemplate';

type SendEmailOptions = {
  to: string;
  subject: string;
};

async function downloadDriveFile(fileId: string) {
  try {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(url, {
      cache: 'force-cache'
      // Alternative if you want to revalidate after some time:
      // next: { revalidate: 86400 } // 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Error downloading file from Google Drive:", error);
    throw error;
  }
}

export async function sendEmail(options: SendEmailOptions) {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const fileBuffer = await downloadDriveFile(import.meta.env.EBOOK_GOOGLE_ID);
  const htmlContent = await renderEmailTemplate(options.to);

  return await resend.emails.send({
    from: import.meta.env.SEND_EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: htmlContent,
    attachments: [{
      filename: 'e-book.pdf',
      content: fileBuffer
    }]
  });
}