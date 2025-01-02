import type { APIRoute } from "astro";
import EbookTemplate from '../../components/emails/EbookTemplate.astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const recipientEmail = url.searchParams.get('email') || '';
  const { default: component } = EbookTemplate;
  const rendered = await component.render({ recipientEmail });
  
  return new Response(rendered.toString(), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}; 