import { Resend } from 'resend';
import { renderEmailTemplate } from './renderEmailTemplate';

type SendEmailOptions = {
  to: string;
  subject: string;
};

// Cache for Google Drive file
let fileCache: string | null = null;
let fileCacheExpiry: number = 0;
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

async function downloadDriveFile(fileId: string) {
  const now = Date.now();
  
  // Return cached file if valid
  if (fileCache && fileCacheExpiry > now) {
    return fileCache;
  }

  // If cache is expired but exists, use it while fetching new version
  const existingCache = fileCache;

  for (let attempt = 0; attempt < RETRY_ATTEMPTS; attempt++) {
    try {
      const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const response = await fetch(url, {
        cache: 'force-cache'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = '';
      uint8Array.forEach(byte => binaryString += String.fromCharCode(byte));
      const base64String = btoa(binaryString);
      
      // Update cache
      fileCache = base64String;
      fileCacheExpiry = now + CACHE_DURATION;
      
      return base64String;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt === RETRY_ATTEMPTS - 1) {
        // If all attempts failed and we have a cached version, use it
        if (existingCache) {
          console.log('Using expired cache as fallback');
          return existingCache;
        }
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }

  throw new Error('Failed to download file after all attempts');
}

// Initialize Resend client once
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendEmail(options: SendEmailOptions) {
  // Fetch file and render template in parallel
  const [fileBase64, htmlContent] = await Promise.all([
    downloadDriveFile(import.meta.env.EBOOK_GOOGLE_ID),
    renderEmailTemplate(options.to)
  ]);

  return await resend.emails.send({
    from: import.meta.env.SEND_EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: htmlContent,
    attachments: [{
      filename: 'e-book.pdf',
      content: fileBase64
    }]
  });
}