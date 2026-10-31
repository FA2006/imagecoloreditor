
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

import { client } from './lib/sanity';
import { urlFor, type SanityImageInput } from './lib/imageUrl';
import Navbar from './Navbar';
import Footer from './Footer';

interface ArticleImage {
  alt?: string;
}

interface BlogPost {
  _id: string;
  title?: string;
  description?: string;
  mainImage?: SanityImageInput & {
  alt?: string;
  };
  publishedAt?: string;
  categories?: string[];
  author?: {
    name?: string;
  };
  body?: PortableTextBlock[];
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    if (!slug) {
      setError('Invalid blog post URL.');
      setIsLoading(false);

      return () => {
        isCurrent = false;
      };
    }

    setIsLoading(true);
    setError(null);
    setPost(null);

    client
      .fetch<BlogPost | null>(
        `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          description,
          publishedAt,
          "categories": categories[]->title,
          "author": author->{name},
          mainImage,
            body[]{
            ...
            }
        }`,
        { slug }
      )
      .then((data) => {
        if (isCurrent) {
          setPost(data);
        }
      })
      .catch((fetchError: unknown) => {
        if (isCurrent) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Unable to load this blog post.'
          );
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [slug]);

  const formatDate = (date?: string) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return null;

    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const portableTextComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="mb-5 mt-10 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          {children}
        </h1>
      ),

      h2: ({ children }) => (
        <h2 className="mb-4 mt-9 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3 className="mb-3 mt-8 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {children}
        </h3>
      ),

      h4: ({ children }) => (
        <h4 className="mb-3 mt-7 text-lg font-bold text-slate-900 dark:text-white">
          {children}
        </h4>
      ),

      normal: ({ children }) => (
        <p className="mb-5 text-base leading-8 text-slate-700 dark:text-slate-300">
          {children}
        </p>
      ),

      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-indigo-500 bg-indigo-50 px-6 py-4 text-lg italic leading-8 text-slate-700 dark:bg-indigo-950/30 dark:text-slate-300">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
          {children}
        </ul>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-slate-900 dark:text-white">
          {children}
        </strong>
      ),

      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),

      link: ({ children, value }) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {children}
        </a>
      ),
    },

    types: {
        image: ({ value }) => {
            const image = value as ArticleImage & SanityImageInput;

            const imageUrl = urlFor(image)
            .width(1200)
            .auto('format')
            .url();

            return (
            <figure className="my-8">
                <img
                src={imageUrl}
                alt={image.alt || 'Blog article image'}
                loading="lazy"
                className="h-auto w-full rounded-2xl object-cover"
                />

                {image.alt && (
                <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    {image.alt}
                </figcaption>
                )}
            </figure>
            );
        },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">

        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <span aria-hidden="true">←</span>
          Back to Blog
        </Link>

        {isLoading && (
          <div
            role="status"
            className="py-24 text-center text-slate-500 dark:text-slate-400"
          >
            Loading article...
          </div>
        )}

        {error && !isLoading && (
          <div
            role="alert"
            className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center text-red-700 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-300"
          >
            <h2 className="mb-2 text-xl font-bold">
              Something went wrong
            </h2>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && !post && (
          <div className="py-24 text-center">
            <h1 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
              Article not found
            </h1>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              This blog post may have been removed or the URL may be incorrect.
            </p>
            <Link
              to="/blog"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Explore other articles
            </Link>
          </div>
        )}

        {!isLoading && !error && post && (
          <article>
            {/* Article heading */}
            <header className="mx-auto mb-10 max-w-3xl text-center">

              <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {post.categories?.length ? (
                  post.categories.map((category, index) => (
                    <span key={`${category}-${index}`}>
                      {category}
                    </span>
                  ))
                ) : (
                  <span>Uncategorized</span>
                )}
              </div>

              <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                {post.title || 'Untitled post'}
              </h1>

              {post.description && (
                <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl">
                  {post.description}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                {post.author?.name && (
                  <span>
                    By <strong className="text-slate-700 dark:text-slate-200">{post.author.name}</strong>
                  </span>
                )}

                {post.author?.name && post.publishedAt && (
                  <span aria-hidden="true">•</span>
                )}

                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>
            </header>


            {/* Featured image */}
            {post.mainImage && (
            <div className="mb-12 overflow-hidden rounded-2xl">
                <img
                src={urlFor(post.mainImage)
                    .width(1600)
                    .height(900)
                    .fit('crop')
                    .auto('format')
                    .url()}
                alt={
                    post.mainImage.alt ||
                    (post.title ? `Cover image for ${post.title}` : 'Blog cover')
                }
                loading="lazy"
                className="max-h-[520px] w-full object-cover"
                />
            </div>
            )}

            {/* Article body */}
            <div className="mx-auto max-w-3xl">
              {post.body?.length ? (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400">
                  No article content is available yet.
                </p>
              )}
            </div>

            {/* Bottom navigation */}
            <div className="mx-auto mt-16 max-w-3xl  pt-8 ">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <span aria-hidden="true">←</span>
                Explore more articles
              </Link>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
