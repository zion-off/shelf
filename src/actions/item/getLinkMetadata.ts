'use server';

import metascraper from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';

const scraper = metascraper([metascraperTitle(), metascraperAuthor(), metascraperImage()]);

export async function getLinkMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const metadata = await scraper({ html, url: response.url });

    const itemData: Record<string, string> = {};
    if (metadata.title) itemData.title = metadata.title;
    if (metadata.author) itemData.author = metadata.author;
    if (metadata.image) itemData.thumbnail = metadata.image;

    return itemData;
  } catch (error) {
    console.error('Error fetching link metadata:', error);
    return null;
  }
}
