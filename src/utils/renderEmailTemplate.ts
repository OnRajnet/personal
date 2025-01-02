export async function renderEmailTemplate(recipientEmail: string) {
  try {
    // Use the current domain or a default one
    const baseUrl = process.env.PUBLIC_SITE_URL || 'https://www.ondrejrajnet.cz';
    const url = new URL('/email-preview', baseUrl);
    url.searchParams.set('recipientEmail', recipientEmail);

    const response = await fetch(url.toString(),
      {
        cache: 'force-cache'
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch template: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Template rendering error:', error);
    throw new Error('Failed to render email template');
  }
}