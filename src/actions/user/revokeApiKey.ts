'use server';

import { auth } from '@/auth';
import mongo from '@/lib/mongodb';
import ApiKey from '@/models/apiKey.model';

export async function revokeApiKey(keyId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await mongo();

    // Find and verify the API key belongs to the user
    const apiKey = await ApiKey.findOne({ _id: keyId, user: session.user.id });
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    // Soft delete by setting isActive to false
    apiKey.isActive = false;
    await apiKey.save();

    return { success: true };
  } catch (error) {
    console.error('Error revoking API key:', error);
    return { success: false, error: 'Failed to revoke API key' };
  }
}
