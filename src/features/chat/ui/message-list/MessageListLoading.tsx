import { clsx } from 'clsx';

export function MessageListLoading() {
  return (
    <section className="pt-5 px-12 max-md:px-6 w-full h-[calc(100vh-30px)] overflow-y-auto scrollbar-custom">
      {MESSAGES_LOADING.map((m) => {
        return (
          <article
            key={m.key}
            className={clsx(
              'rounded-xl relative mb-3 border-foreground/40 bg-background animate-pulse',
              m.style
            )}
          ></article>
        );
      })}
    </section>
  );
}

const MESSAGES_LOADING = [
  { key: 1, style: 'ml-auto w-42 h-20' },
  { key: 2, style: 'ml-auto w-20 h-14' },
  { key: 3, style: 'mr-auto w-38 h-18' },
  { key: 4, style: 'mr-auto w-24 h-14' },
  { key: 5, style: 'ml-auto w-46 h-20' },
  { key: 6, style: 'mr-auto w-34 h-18' },
];
