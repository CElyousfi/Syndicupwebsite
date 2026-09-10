/** Pictogrammes de la section sécurité — repris tels quels du prototype. */
export function SecurityIcon({ name }: { name: "lock" | "split" | "layers" | "shield" }) {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;

  if (name === "lock") {
    return (
      <svg {...common}>
        <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.6" fill="#4c6c5a" />
        <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" stroke="#4c6c5a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="15.6" r="1.5" fill="#ffffff" />
      </svg>
    );
  }
  if (name === "split") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="7" height="16" rx="2" fill="#595d75" />
        <rect x="13.5" y="4" width="7" height="16" rx="2" fill="#b8bed5" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="5" rx="2" fill="#48707a" />
        <rect x="3.5" y="11.5" width="17" height="5" rx="2" fill="#c1d8da" />
        <rect x="3.5" y="18" width="17" height="2.6" rx="1.3" fill="#c1d8da" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3 5 5.4v5.2c0 4.5 2.9 7.7 7 9.4 4.1-1.7 7-4.9 7-9.4V5.4z" fill="#a39170" />
      <path d="m9 11.7 2.2 2.2 4-4.3" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
