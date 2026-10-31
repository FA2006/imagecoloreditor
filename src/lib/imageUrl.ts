import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';

const builder = imageUrlBuilder(client);

export type SanityImageInput = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageInput) {
  return builder.image(source);
}
