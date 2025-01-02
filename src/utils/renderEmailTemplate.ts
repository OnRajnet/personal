import { experimental_AstroContainer } from "astro/container";

import EbookTemplate from '../components/emails/EbookTemplate.astro';

export async function renderEmailTemplate(recipientEmail: string) {
 const container = await experimental_AstroContainer.create();
 return await container.renderToString(EbookTemplate, {
    props: {
        recipientEmail 
    }
  });
}