/** Wortmarke: das Profil eines gefälzten Bretts neben dem Namen. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="flex-none">
        <path d="M0 0H11V9H20V20H0Z" fill="currentColor" />
      </svg>
      <span
        className="font-display text-[1.2rem] font-[800] leading-none tracking-[0.02em]"
        style={{ fontVariationSettings: '"wdth" 125' }}
      >
        FALZ
      </span>
    </span>
  );
}
