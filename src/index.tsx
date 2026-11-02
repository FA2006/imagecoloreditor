
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import DonatePage from './Donate';


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

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
