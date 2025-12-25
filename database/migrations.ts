/**
 * Database migrations and maintenance utilities.
 * Run these during application startup if dealing with legacy data.
 */

import { deduplicateAndRebuildIndexes as deduplicateBookings } from './booking.model';

/**
 * Runs all necessary migrations and index rebuilds.
 * Call this during application startup to ensure data integrity.
 */
export async function runMigrations(): Promise<void> {
  console.log('Starting database migrations...');

  try {
    // Deduplicating bookings and rebuilding indexes
    console.log('Running booking deduplication and index rebuild...');
    await deduplicateBookings();
    console.log('Booking migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }

  console.log('All migrations completed successfully.');
}

export default runMigrations;
