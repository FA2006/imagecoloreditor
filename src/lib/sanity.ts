import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'jhwksw9p', 
  dataset: 'production',
  apiVersion: '2026-10-27',      
  useCdn: true,
});
