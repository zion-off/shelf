import { z } from 'zod';

export const profileEditForm = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name must be less than 120 characters'),
  username: z.string().min(1, 'Username is required').max(30, 'Username must be less than 120 characters')
});
