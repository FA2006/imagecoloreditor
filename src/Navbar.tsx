import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Wand2, X } from 'lucide-react';
import Donate from './Donate';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Keep the active route highlighted in both themes.
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center rounded-2xl px-5 py-2 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
      isActive
        ? 'bg-indigo-100 text-indigo-800 dark:bg-slate-500/30 dark:text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-700 dark:text-indigo-200 dark:hover:bg-slate-500/30 dark:hover:text-white'
    }`;

    //remove the announcement bar and donate link if you are already in the page
    const location = useLocation();

    const isDonatePage = location.pathname === '/donate';


  return (
    <>
      {/* Announcement bar */}
      {!isDonatePage && (
        <aside
          aria-label="Announcement"
          className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center border-b border-indigo-200 bg-indigo-50 px-4 text-center text-xs text-indigo-900 backdrop-blur-md dark:border-indigo-300/10 dark:bg-indigo-950/95 dark:text-indigo-100 sm:text-sm"
        >
          <span className="mr-2 text-indigo-700/80 dark:text-indigo-200/80">
            Support the project
          </span>

          <Donate className="font-semibold text-indigo-800/90 underline decoration-indigo-400 underline-offset-4 transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-indigo-100/80 dark:decoration-indigo-300/70 dark:hover:text-indigo-200 dark:focus-visible:ring-indigo-300">
            Donate
          </Donate>
        </aside>
      )}

      {!isDonatePage && (
        <div className="h-9" aria-hidden="true" />
      )}

      {/* Main navigation */}
      <nav
        aria-label="Main navigation"
        className={`sticky ${
          isDonatePage ? 'top-0' : 'top-9'
        } z-50 mb-8 w-full rounded-bl-lg rounded-br-lg border-b border-slate-200 bg-white/95 px-5 py-4 shadow-xl shadow-slate-900/7 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-800/95 dark:shadow-black/20`}
      >
        <div className="flex items-center justify-between">

          {/* Brand */}
          <Link
            to="/"
            aria-label="Image Color Filler homepage"
            className="group inline-flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 ring-1 ring-inset ring-indigo-300/60 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110 group-focus-visible:rotate-12 group-focus-visible:scale-110 dark:bg-indigo-500/15 dark:ring-indigo-400/30">
              <Wand2
                className="h-5 w-5 text-indigo-600 dark:text-indigo-300"
                aria-hidden="true"
              />
            </span>

            <h2 className="text-sm font-bold tracking-wider text-slate-800 sm:text-base dark:text-slate-300">
              Image Color Filler
            </h2>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 sm:flex">
            <NavLink to="/blog" className={linkClassName}>
              Blog
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-indigo-200 dark:hover:bg-slate-700 dark:hover:text-white sm:hidden"
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-3 dark:border-slate-700 sm:hidden"
          >
            <NavLink
              to="/blog"
              className={linkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>
          </div>
        )}
      </nav>

    </>
  );
};

export default Navbar;
