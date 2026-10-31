
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import BlogPage from './BlogPage';
import BlogPostPage from './BlogPostPage';
import ColorPalettes from './Colorpalettes';

import './theme.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Blog routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Color palettes */}
        <Route path="/color-palettes" element={<ColorPalettes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
