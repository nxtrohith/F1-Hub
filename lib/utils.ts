import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Determines a safe absolute base URL for server-side fetches during build/SSG.
// Falls back to VERCEL_URL (with https) or localhost to avoid ERR_INVALID_URL.
export function getBaseUrl() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || 'http://localhost:3000'
  return base.startsWith('http') ? base : `https://${base}`
}
