/**
 * Utility functions for folder slug conversion
 * - "ungrouped" slug maps to null folderId (items without a folder)
 * - All other slugs are folder IDs
 */

export const UNGROUPED_SLUG = 'ungrouped';

/**
 * Convert a folder ID to a URL slug
 * null -> "ungrouped"
 * folderId -> folderId
 */
export function folderIdToSlug(folderId: string | null): string {
  return folderId ?? UNGROUPED_SLUG;
}

/**
 * Convert a URL slug to a folder ID
 * "ungrouped" -> null
 * folderId -> folderId
 */
export function slugToFolderId(slug: string): string | null {
  return slug === UNGROUPED_SLUG ? null : slug;
}

/**
 * Check if a slug represents ungrouped items
 */
export function isUngroupedSlug(slug: string): boolean {
  return slug === UNGROUPED_SLUG;
}
