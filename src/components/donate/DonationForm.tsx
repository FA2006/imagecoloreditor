
import { useState } from 'react';

export default function DonationForm() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState('10');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Make a Donation
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Choose an amount you'd like to contribute towards supporting
          Image Color Filler.
        </p>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Support Free the Tools
        </h3>

        {/* Donation frequency */}
        <div className="flex rounded-full bg-stone-200 p-1 dark:bg-slate-700">
          <button
            type="button"
            onClick={() => setFrequency('once')}
            aria-pressed={frequency === 'once'}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              frequency === 'once'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            One time
          </button>

          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            aria-pressed={frequency === 'monthly'}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              frequency === 'monthly'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Preset donation amounts */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Choose amount
          </label>

          <div className="grid grid-cols-4 gap-2">
            {['5', '10', '15', '20'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                aria-pressed={amount === value}
                className={`flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  amount === value
                    ? 'border-slate-700 bg-white text-slate-900 dark:border-indigo-400 dark:bg-slate-700 dark:text-white'
                    : 'border-transparent bg-stone-200 text-slate-800 hover:bg-stone-300 dark:bg-slate-700/70 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {amount === value && (
                  <span className="text-emerald-500">✓</span>
                )}
                ${value}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Or enter an amount
          </label>

          <div className="flex items-center rounded-lg border border-stone-300 bg-stone-100 px-4 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              $
            </span>

            <input
              type="number"
              id="amount"
              name="amount"
              min="1"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full no-number-arrows bg-transparent px-2 py-2.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Display name */}
        <div>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name"
            className="block w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-stone-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Optional message */}
        <div>
          <textarea
            name="message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="block w-full resize-y rounded-lg border border-stone-300 bg-stone-100 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-stone-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Monthly checkbox */}
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={frequency === 'monthly'}
            onChange={(e) =>
              setFrequency(e.target.checked ? 'monthly' : 'once')
            }
            className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-indigo-600 focus:ring-2 focus:ring-indigo-500"
          />
          Make it monthly
        </label>

        {/* Donation button */}
        <button
          type="submit"
          disabled={!amount || Number(amount) <= 0}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:ring-offset-slate-900"
        >
          Tip ${Number(amount || 0).toLocaleString()}
        </button>
      </form>
    </div>
  );
}
