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

/**
 * Transform Cloudinary URL to apply consistent sizing for car images.
 * This ensures all car images display at the same size regardless of original dimensions.
 */
export function getCloudinaryCarImage(url: string, width: number = 800, height: number = 350): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }
  
  // Insert transformation parameters after /upload/
  // c_pad = pad to fit dimensions, b_transparent = transparent background for padding
  // f_auto = auto format, q_auto = auto quality
  const transformation = `c_pad,w_${width},h_${height},b_auto,f_auto,q_auto`;
  return url.replace('/upload/', `/upload/${transformation}/`);
}
