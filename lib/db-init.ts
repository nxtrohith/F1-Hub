/**
 * Example startup initialization for running migrations.
 * 
 * Add this to your app/layout.tsx or create a dedicated initialization route.
 * This ensures indexes and deduplication run when your app starts.
 */

import { connectToDatabase } from '@/lib/mongodb';
import { runMigrations } from '@/database';

/**
 * Initialize database on app startup.
 * This function runs migrations and ensures indexes are properly created.
 * 
 * Usage:
 * - Add to app/layout.tsx at the top of the root layout component
 * - Or create a dedicated API route: app/api/init/route.ts
 */
export async function initializeDatabase(): Promise<void> {
  try {
    // Ensure database connection is established
    await connectToDatabase();
    console.log('✓ Database connection established');

    // Run all migrations (including booking deduplication and index rebuild)
    await runMigrations();
    console.log('✓ Database migrations completed');
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    // In production, you may want to throw to prevent app startup
    throw error;
  }
}

/**
 * Alternative: If you prefer using an API route for initialization
 * Create: app/api/init/route.ts
 */
export async function exampleApiRoute() {
  const exampleRoute = `
import { initializeDatabase } from '@/lib/db-init';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
  `;
  
  return exampleRoute;
}
