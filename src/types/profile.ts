import { z } from 'zod';
import { profileEditForm } from '@/schema/profile';

export type profileEditFormValues = z.infer<typeof profileEditForm>;
