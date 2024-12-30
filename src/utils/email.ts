import { createTransport, type Transporter } from "nodemailer";
import type { Attachment } from 'nodemailer/lib/mailer';

type SendEmailOptions = {
  to: string;
  subject: string;
  // html: string;
};

async function downloadDriveFile(fileId: string) {
  try {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(url);
    
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

export async function sendEmail(options: SendEmailOptions): Promise<Transporter> {
  const transporter = await getEmailTransporter();

  const fileBuffer = await downloadDriveFile(import.meta.env.EBOOK_GOOGLE_ID);
  
  console.log("send email", fileBuffer);
  return new Promise(async (resolve, reject) => {
    const { to, subject } = options;
    const from = import.meta.env.SEND_EMAIL_FROM;
    const message = { to, subject, from };
    const attachments: Attachment[] = [
      {
        filename: "e-book.pdf",
        content: fileBuffer,
        contentType: "application/pdf"
      },
    ];

    transporter.sendMail({
      ...message,
      html: `test`,
      attachments
    }, (err, info) => {
      // Log the error if one occurred
      if (err) {
        console.error(err);
        reject(err);
      }
      // Log the message ID and preview URL if available.
      console.log("Message sent:", info.messageId);
      resolve(info);
    });
  });
}

async function getEmailTransporter(): Promise<Transporter> {
  return new Promise((resolve, reject) => {
    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error("Missing Resend configuration");
    }
    const transporter = createTransport({
      host: "smtp.resend.com",
      secure: true,
      port: 465,
      auth: { user: "resend", pass: import.meta.env.RESEND_API_KEY },
    });
    resolve(transporter);
  });
}