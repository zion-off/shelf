'use client';

import { useState } from 'react';
import { generateApiKey } from '@/actions/user/generateApiKey';
import { revokeApiKey } from '@/actions/user/revokeApiKey';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import type { ApiKeyInfo } from '@/actions/user/getUserApiKeys';

interface ApiKeySectionProps {
  initialApiKeys: ApiKeyInfo[];
  showHeading?: boolean;
}

export default function ApiKeySection({ initialApiKeys, showHeading = false }: ApiKeySectionProps) {
  const [apiKeys, setApiKeys] = useState<ApiKeyInfo[]>(initialApiKeys);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      const result = await generateApiKey();
      if (result.success && result.apiKey && result.keyId && result.createdAt) {
        setNewApiKey(result.apiKey);
        // Add the new key to the list with proper ID from server
        setApiKeys(prev => [{
          _id: result.keyId!,
          createdAt: result.createdAt!,
          isActive: true
        }, ...prev]);
      } else {
        console.error('Failed to generate API key:', result.error);
      }
    } catch (error) {
      console.error('Error generating API key:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    try {
      const result = await revokeApiKey(keyId);
      if (result.success) {
        setApiKeys(prev => prev.filter(key => key._id !== keyId));
      } else {
        console.error('Failed to revoke API key:', result.error);
      }
    } catch (error) {
      console.error('Error revoking API key:', error);
    }
  };

  const handleCopy = async (text: string, id?: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id || 'new');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Heading with Generate link */}
      {showHeading && (
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-sm font-medium">API Keys</h3>
          <button
            onClick={handleGenerateKey}
            disabled={isGenerating}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      {/* Show newly generated key */}
      {newApiKey && (
        <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 mb-4">
          <p className="text-sm font-medium mb-2 text-yellow-900 dark:text-yellow-100">
            Save this API key now - you won't see it again!
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 bg-white dark:bg-neutral-900 rounded text-sm font-mono">
              {newApiKey}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopy(newApiKey)}
            >
              {copiedId === 'new' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2"
            onClick={() => setNewApiKey(null)}
          >
            Done
          </Button>
        </div>
      )}

      {/* Empty state */}
      {apiKeys.length === 0 && !newApiKey && (
        <p className="text-sm text-muted-foreground">
          No API keys have been generated yet. Generate one for rich iOS integrations!
        </p>
      )}

      {/* List existing API keys */}
      {apiKeys.length > 0 && (
        <div className="space-y-2">
          {apiKeys.map((key) => (
            <div
              key={key._id}
              className="bg-z-background-secondary flex items-center justify-between p-3 rounded-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono">
                    sk_{'*'.repeat(32)}
                  </code>
                </div>
                <p className="text-xs text-z-foreground mt-1">
                  Created {formatDate(key.createdAt)}
                  {key.lastUsedAt && ` • Last used ${formatDate(key.lastUsedAt)}`}
                </p>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleRevoke(key._id)}
              >
                Revoke
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
