import React from "react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div>{message}</div>
    </div>
  );
}
