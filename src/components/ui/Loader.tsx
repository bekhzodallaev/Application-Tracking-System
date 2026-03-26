'use client';

type LoaderProps = {
  text?: string;
};

export function Loader({ text }: LoaderProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-white/80 dark:bg-black/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-gray-900 dark:bg-white [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-gray-900 dark:bg-white [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-gray-900 dark:bg-white" />
      </div>

      {text && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );
}
