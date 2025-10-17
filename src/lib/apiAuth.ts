import bcrypt from 'bcryptjs';
import mongo from '@/lib/mongodb';
import ApiKey from '@/models/apiKey.model';
import User from '@/models/user.model';

export async function authenticateApiKey(bearerToken: string): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    // Extract the token from "Bearer sk_..."
    const token = bearerToken.startsWith('Bearer ')
      ? bearerToken.substring(7)
      : bearerToken;

    if (!token || !token.startsWith('sk_')) {
      return { success: false, error: 'Invalid API key format' };
    }

    await mongo();

    // Find all active API keys
    const apiKeys = await ApiKey.find({ isActive: true }).lean();

    // Check each API key hash
    for (const apiKeyDoc of apiKeys) {
      const isMatch = await bcrypt.compare(token, apiKeyDoc.keyHash);

      if (isMatch) {
        // Update lastUsedAt timestamp
        await ApiKey.updateOne(
          { _id: apiKeyDoc._id },
          { $set: { lastUsedAt: new Date() } }
        );

        // Verify user exists
        const user = await User.findById(apiKeyDoc.user);
        if (!user) {
          return { success: false, error: 'User not found' };
        }

        return {
          success: true,
          userId: apiKeyDoc.user.toString()
        };
      }
    }

    return { success: false, error: 'Invalid API key' };
  } catch (error) {
    console.error('Error authenticating API key:', error);
    return { success: false, error: 'Authentication failed' };
  }
}
