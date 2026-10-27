"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="inhalt" className="frame legal">
      <h1 className="display legal__title">Da hat etwas nicht gepasst.</h1>
      <p className="legal__body">Beim Laden ist ein Fehler aufgetreten.</p>
      <button type="button" onClick={reset} className="action mt-10">
        Erneut versuchen
      </button>
    </main>
  );
}
