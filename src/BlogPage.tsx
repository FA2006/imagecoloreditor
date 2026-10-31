import { useEffect, useState } from 'react';
import { client } from './lib/sanity';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface BlogPost {
_id: string;
title?: string;
description?: string;
categories?: string[];
imageUrl?: string;
slug?: { current: string };
}

const BlogPage = () => {
const [posts, setPosts] = useState<BlogPost[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
let isCurrent = true;

client
  .fetch<BlogPost[]>(
    `*[_type == "post"]{
      _id,
      title,
      description,
      "categories": categories[]->title,
      "imageUrl": mainImage.asset->url,
      slug
    }`
  )
  .then((data) => {
    if (isCurrent) setPosts(data);
  })
  .catch((fetchError: unknown) => {
    if (isCurrent) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'Unable to load blog posts.'
      );
    }
  })
  .finally(() => {
    if (isCurrent) setIsLoading(false);
  });

return () => {
  isCurrent = false;
};

}, []);

// SVG placeholders for posts without cover images
const svgPlaceholders = [
(
<svg
     key="blue"
     viewBox="0 0 400 300"
     className="absolute inset-0 h-full w-full"
   >
<rect width="400" height="300" fill="#3b82f6" />
<circle
       cx="200"
       cy="150"
       r="100"
       fill="#22d3ee"
       opacity="0.6"
     />
</svg>
),
(
<svg
     key="purple"
     viewBox="0 0 400 300"
     className="absolute inset-0 h-full w-full"
   >
<rect width="400" height="300" fill="#7c3aed" />
<circle
       cx="300"
       cy="100"
       r="80"
       fill="#facc15"
       opacity="0.6"
     />
</svg>
),
(
<svg
     key="green"
     viewBox="0 0 400 300"
     className="absolute inset-0 h-full w-full"
   >
<rect width="400" height="300" fill="#10b981" />
<circle
       cx="150"
       cy="200"
       r="90"
       fill="#ec4899"
       opacity="0.5"
     />
</svg>
),
];

return (
<div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
<Navbar />

  <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col p-4 sm:p-6 lg:p-8">
    <main aria-label="Blog" className="flex-1">
      <section
        aria-labelledby="blog-heading"
        className="mx-auto w-full"
      >
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
            The Color Filler Blog
          </p>

          <h1
            id="blog-heading"
            className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
          >
            Ideas for your next creative project
          </h1>
        </div>

        {isLoading && (
          <p
            role="status"
            className="text-center text-sm text-slate-500 dark:text-slate-400"
          >
            Loading blog posts...
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-4 text-center text-sm text-red-700 dark:border-red-400/20 dark:bg-red-950/30 dark:text-red-300"
          >
            Blog posts could not be loaded: {error}
          </p>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            No blog posts have been published yet.
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug?.current}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800/80 dark:shadow-black/20 dark:hover:border-indigo-400/60 dark:hover:shadow-indigo-500/20"
            >
              <article className="flex h-full flex-col">
                <div className="relative aspect-[16/12] w-full shrink-0 self-stretch overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={
                        post.title
                          ? `Cover image for ${post.title}`
                          : 'Blog post cover'
                      }
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    svgPlaceholders[idx % svgPlaceholders.length]
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
                    {post.categories?.[0] || 'Uncategorized'}
                  </p>

                  <h2
                    className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-xl dark:text-white dark:group-hover:text-indigo-200"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {post.title || 'Untitled post'}
                  </h2>

                  <p
                    className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      overflow: 'hidden',
                    }}
                  >
                    {post.description || 'No description available.'}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  </div>
  
  <Footer />
</div>

);
};

export default BlogPage;