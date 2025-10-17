import { NextRequest, NextResponse } from 'next/server';
import { authenticateApiKey } from '@/lib/apiAuth';
import { getLinkMetadata } from '@/actions/item/getLinkMetadata';
import { getDefaultFolder } from '@/actions/folder/getDefaultFolder';
import mongo from '@/lib/mongodb';
import Item from '@/models/item.model';
import Folder from '@/models/folder.model';
import mongoose from 'mongoose';
import { getRandomHex } from '@/utils';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const authResult = await authenticateApiKey(authHeader);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.userId!;

    // 2. Parse and validate request body
    const body = await request.json();
    const { link, folder } = body;

    if (!link || typeof link !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid link field' },
        { status: 400 }
      );
    }

    await mongo();

    // 3. Resolve folder
    let folderId: mongoose.Types.ObjectId | null = null;

    if (folder) {
      // Try to find folder by name or ID
      const folderDoc = await Folder.findOne({
        owner: userId,
        $or: [
          { name: folder },
          { _id: mongoose.isValidObjectId(folder) ? folder : null }
        ]
      });

      if (!folderDoc) {
        return NextResponse.json(
          { error: 'Folder not found or does not belong to user' },
          { status: 400 }
        );
      }

      folderId = folderDoc._id;
    } else {
      // Use default folder
      const defaultFolderId = await getDefaultFolder({ dbID: userId });
      if (defaultFolderId) {
        folderId = new mongoose.Types.ObjectId(defaultFolderId);
      }
    }

    // 4. Fetch link metadata
    const metadata = await getLinkMetadata(link);

    if (!metadata) {
      return NextResponse.json(
        { error: 'Failed to fetch link metadata' },
        { status: 400 }
      );
    }

    // 5. Create and save item
    const itemData = {
      owner: new mongoose.Types.ObjectId(userId),
      title: metadata.title || link,
      author: metadata.author || 'Unknown',
      link: link,
      thumbnail: metadata.thumbnail,
      placeholderCover: getRandomHex(),
      in_folder: folderId
    };

    const newItem = new Item(itemData);
    const savedItem = await newItem.save();

    // Revalidate cache
    revalidateTag(`user-${userId}-folder-${folderId?.toString() || null}`);

    // 6. Return success response
    const responseItem = JSON.parse(JSON.stringify(savedItem));
    return NextResponse.json(
      {
        success: true,
        title: responseItem.title,
        author: responseItem.author,
        item: responseItem
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in /api/add:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
