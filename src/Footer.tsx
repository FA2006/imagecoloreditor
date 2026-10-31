
import { socialLinks } from './Config/socialLinks';
import { NavLink } from 'react-router-dom';
import { WandSparkles } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Image Editor', to: '/' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Features', to: '/features' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Blog', to: '/blog' },
      { label: 'Color Palettes', to: '/color-palettes' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Use Cases', to: '/use-cases' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact & Feedback', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
];

const Footer = () => (
  <footer className="mt-auto pt-16 text-slate-900 dark:text-slate-200">

    {/* Decorative divider */}
    <div className="flex w-full items-center gap-4">
      <span className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />

      <WandSparkles
        className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400"
        strokeWidth={1.7}
        aria-label="Image Color Filler logo"
      />

      <span className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
    </div>

    {/* Navigation section */}
    <nav
      aria-label="Footer navigation"
      className="mx-auto grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-8 gap-y-10 px-4 py-10 sm:grid-cols-4 sm:gap-x-10 sm:px-6 lg:px-8"
    >
      {footerSections.map((section) => (
        <div
          key={section.title}
          className="flex w-full flex-col items-center gap-4 text-center sm:items-start sm:text-left"
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            {section.title}
          </h2>

          <ul className="flex flex-col items-center gap-3 sm:items-start">
            {section.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>

    {/* Brand, social links and copyright section */}
    <div className="w-full border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 py-6 sm:flex-row sm:gap-8 sm:px-6 lg:px-8">

        {/* Brand and social links */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="text-base font-medium text-slate-800 dark:text-slate-300">
            Image Color Filler
          </p>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ name, href, Icon }) =>
              href ? (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Icon
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <span
                  key={name}
                  aria-label={`${name} link not configured`}
                  title={`${name} link not configured`}
                  className="cursor-not-allowed rounded-lg p-2 text-slate-400 dark:text-slate-600"
                >
                  <Icon
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
              )
            )}
          </div>
        </div>

        {/* Theme toggle and copyright */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <ThemeToggle />

          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} · An inkspiff product.
          </p>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
