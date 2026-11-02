import Navbar from './Navbar';
import Footer from './Footer';

const DonatePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-200">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Support Our Work</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Help us continue to improve Image Color Filler by making a donation.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default DonatePage;

