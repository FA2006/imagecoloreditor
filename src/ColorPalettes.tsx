
import { useEffect, useRef } from 'react';
import { ArrowRight, Palette } from 'lucide-react';
import gsap from 'gsap';

import Navbar from './Navbar';
import Footer from './Footer';

// Temporary palette data for the hero animation
const paletteColumns = [
  [
    ['#F9A8D4', '#C4B5FD', '#A7F3D0', '#FDE68A'],
    ['#FCA5A5', '#FDBA74', '#FDE68A', '#BEF264'],
    ['#93C5FD', '#A5B4FC', '#C4B5FD', '#F0ABFC'],
    ['#F5D0FE', '#DDD6FE', '#BFDBFE', '#BAE6FD'],
  ],
  [
    ['#264653', '#2A9D8F', '#E9C46A', '#F4A261'],
    ['#E76F51', '#D62828', '#F77F00', '#FCBF49'],
    ['#606C38', '#283618', '#DDA15E', '#FEFAE0'],
    ['#6D597A', '#B56576', '#E56B6F', '#EAAC8B'],
  ],
  [
    ['#0F172A', '#1E293B', '#334155', '#64748B'],
    ['#312E81', '#4338CA', '#6366F1', '#A5B4FC'],
    ['#134E4A', '#0F766E', '#14B8A6', '#99F6E4'],
    ['#581C87', '#7E22CE', '#C084FC', '#E9D5FF'],
  ],
];

const Colorpalettes = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Animate the hero introduction when the page loads
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white">

        {/* Hero section */}
        <section ref={heroRef} className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">

          {/* Left side: Introduction */}
          <div className="hero-content max-w-xl">

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find colors.
              <span className="block text-indigo-600 dark:text-indigo-400">
                Create something beautiful.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              Discover beautiful color combinations, explore creative
              palettes, and find the perfect shades to bring your ideas
              to life.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#palettes"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-indigo-600/30"
              >
                Explore palettes
                <ArrowRight className="h-4 w-4" />
              </a>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                Find your next color inspiration
              </span>
            </div>

          </div>

          {/* Right side: Animated palette columns */}
          <div className="relative h-[300px] overflow-hidden rounded-3xl bg-slate-100 p-4 dark:bg-slate-800/60 sm:h-[420px] sm:p-6">

            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-800" />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-slate-100 to-transparent dark:from-slate-800" />

            <div className="flex h-full justify-center gap-3 sm:gap-5">

              {paletteColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="h-full w-1/3 max-w-[150px] overflow-hidden"
                >
                  <div
                    className={`palette-track flex flex-col ${
                      columnIndex === 1
                        ? 'animate-palette-down'
                        : 'animate-palette-up'
                    }`}
                  >

                    {/* Original palette group */}
                    <div className="flex flex-col gap-4 pb-4">
                      {column.map((colors, paletteIndex) => (
                        <div
                          key={paletteIndex}
                          className="shrink-0 rounded-2xl border border-white/60 bg-white p-2 shadow-lg shadow-slate-900/5 dark:border-slate-600 dark:bg-slate-700"
                        >
                          <div className="flex gap-1.5">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className="h-12 min-w-0 flex-1 rounded-md sm:h-16"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Duplicate group for seamless scrolling */}
                    <div
                      aria-hidden="true"
                      className="flex flex-col gap-4"
                    >
                      {column.map((colors, paletteIndex) => (
                        <div
                          key={paletteIndex}
                          className="shrink-0 rounded-2xl border border-white/60 bg-white p-2 shadow-lg shadow-slate-900/5 dark:border-slate-600 dark:bg-slate-700"
                        >
                          <div className="flex gap-1.5">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className="h-12 min-w-0 flex-1 rounded-md sm:h-16"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              ))}

            </div>
          </div>

        </section>

        {/* Palette discovery section will go here */}
        <section id="palettes" className="scroll-mt-24">
          {/* We'll build this section next. */}
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Colorpalettes;
