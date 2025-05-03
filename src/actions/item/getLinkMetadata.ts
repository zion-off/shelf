'use server';

import { getLinkPreview } from 'link-preview-js';

export async function getLinkMetadata(url: string) {
  try {
    const metadata = await getLinkPreview(url);
    const itemData: Record<string, string> = {};
    if ('title' in metadata && metadata.title) itemData.title = metadata.title;
    if ('siteName' in metadata && metadata.siteName) itemData.author = metadata.siteName;
    if ('images' in metadata && metadata.images && metadata.images.length > 0) {
      itemData.thumbnail = metadata.images[0];
    }
    return itemData;
  } catch (error) {
    console.error('Error fetching link metadata:', error);
    return null;
  }
}
