
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import './theme.css';
import App from './App';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import DonatePage from './DonatePage';



const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        {/* Home route */}
        <Route path="/" element={<App />} />

        {/* Blog routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Donate route */}
        <Route path="/donate" element={<DonatePage />} />

        {/* Unmatched routes */}
        <Route
          path="*"
          element={
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-slate-900 dark:text-slate-200">
              <h1 className="text-3xl font-semibold">Page not found</h1>
              <p className="text-slate-600 dark:text-slate-400">
                The page you requested does not exist.
              </p>
              <Link
                to="/"
                className="text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-300"
              >
                Return to the image editor
              </Link>
            </main>
          }
        />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);
