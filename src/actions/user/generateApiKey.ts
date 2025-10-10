'use server';

import { auth } from '@/auth';
import mongo from '@/lib/mongodb';
import ApiKey from '@/models/apiKey.model';
import User from '@/models/user.model';
import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';

export async function generateApiKey(name?: string): Promise<{ success: boolean; apiKey?: string; keyId?: string; createdAt?: Date; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await mongo();

    // Verify user exists
    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Generate a random API key
    const randomString = randomBytes(24).toString('base64url');
    const apiKey = `sk_${randomString}`;

    // Hash the API key before storing
    const salt = await bcrypt.genSalt(10);
    const keyHash = await bcrypt.hash(apiKey, salt);

    // Create new API key document
    const newKey = await ApiKey.create({
      user: session.user.id,
      keyHash,
      name: name || undefined,
      isActive: true
    });

    // Return the plain text API key (only time it will be shown) and the key info
    return {
      success: true,
      apiKey,
      keyId: newKey._id.toString(),
      createdAt: newKey.createdAt
    };
  } catch (error) {
    console.error('Error generating API key:', error);
    return { success: false, error: 'Failed to generate API key' };
  }
}
