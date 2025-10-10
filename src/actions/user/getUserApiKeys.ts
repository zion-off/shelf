'use server';

import { auth } from '@/auth';
import mongo from '@/lib/mongodb';
import ApiKey from '@/models/apiKey.model';

export interface ApiKeyInfo {
  _id: string;
  name?: string;
  createdAt: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}

export async function getUserApiKeys(): Promise<{ success: boolean; apiKeys?: ApiKeyInfo[]; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await mongo();

    // Get all active API keys for the user
    const apiKeys = await ApiKey.find({ user: session.user.id, isActive: true })
      .select('_id name createdAt lastUsedAt isActive')
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      apiKeys: apiKeys.map(key => ({
        _id: key._id.toString(),
        name: key.name,
        createdAt: key.createdAt,
        lastUsedAt: key.lastUsedAt,
        isActive: key.isActive
      }))
    };
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return { success: false, error: 'Failed to fetch API keys' };
  }
}
