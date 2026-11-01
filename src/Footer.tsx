
import { socialLinks } from './Config/socialLinks';
import { NavLink } from 'react-router-dom';
import { WandSparkles, Wand2 } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';

const footerSections = [
  {
    title: 'Links',
    links: [
      { label: 'Image Editor', to: '/' },
      { label: 'Blog', to: '/blog' },
      { label: 'About', to: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'How It Works', to: '/how-it-works' },
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
        className="h-5 w-5 shrink-0  text-indigo-600 dark:text-indigo-400"
        strokeWidth={1.7}
        aria-label="Image Color Filler logo"
      />

      <span className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
    </div>

    {/* Navigation section */}
    <nav
      aria-label="Footer navigation"
      className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-8 px-10 py-14 sm:gap-x-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-12 lg:px-10"
    >

      {/* Brand and social links */}
      <div className="col-start-1 row-start-1 flex flex-col items-start px-5 gap-4">

        {/* Brand name */}
        <p className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-200">
          Image Color Filler
        </p>

        {/* Social links */}
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
                className="rounded-lg p-2 text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <span
                key={name}
                aria-label={`${name} link not configured`}
                title={`${name} link not configured`}
                className="cursor-not-allowed rounded-lg p-2 text-slate-400 dark:text-slate-600"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            )
          )}
        </div>

        {/* Theme toggle */}
        <div className="flex items-center px-10">
          <ThemeToggle />
        </div>

      </div>
      

      <div className="col-span-2 row-start-2 flex justify-center gap-8 sm:gap-12 lg:col-span-1 lg:col-start-2 lg:row-start-1">
        {footerSections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col gap-4 text-left"
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
              {section.title}
            </h2>

            <ul className="flex flex-col items-start gap-3">
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
      </div>

      {/* Logo */}
      <div className="col-start-2 row-start-1 flex justify-self-end lg:col-start-3 px-14">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 ring-1 ring-inset ring-indigo-300/60 dark:bg-indigo-950 dark:ring-indigo-800 sm:h-16 sm:w-16 lg:h-48 lg:w-48">
          <Wand2
            className="h-7 w-7 text-indigo-600 dark:text-indigo-300 lg:h-24 lg:w-24"
            aria-hidden="true"
          />
        </span>
      </div>
    </nav>

    {/* copyright section */}
    <div className="w-full border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl justify-center px-4 py-6 sm:px-6 lg:px-8">
        {/* Theme toggle and copyright */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">

          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} · An inkspiff product.
          </p>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
