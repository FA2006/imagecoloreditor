import Navbar from './Navbar';
import Footer from './Footer';
import DonationForm from './components/donate/DonationForm';

const DonatePage = () => {

  return (
    <div className="flex min-h-screen  flex-col bg-slate-100 font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-950/50 dark:text-slate-200">
      <Navbar />

      {/* 2. Main donation area */}
      <main className="flex-1  px-8 py-12 pb-20 transition-colors duration-300  sm:px-14 sm:py-7 sm:pb-24 lg:px-24">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-6 lg:grid-cols-5">

          {/* 3. Donation information island */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-900 lg:col-span-2 sm:p-6 lg:sticky lg:top-20 lg:self-start">
          
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Why Your Donation Matters
            </h2>

            <div className="mt-8 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/40">
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Image Color Editor is built to make image recoloring and
                customization easier. Your support helps us maintain the
                platform and continue making improvements.
              </p>
            </div>

          </section>

          {/* 4. Donation form island */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/70 dark:bg-slate-900 lg:col-span-3 sm:p-10">
            <DonationForm />
          </section>

        </div>
      </main>

      <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
        <Footer />
      </div>
    </div>
  );
};

export default DonatePage;
