# Booking Model Update - Compound Unique Index Implementation

## Summary of Changes

### 1. **Compound Unique Index Added**
   - **File**: [database/booking.model.ts](database/booking.model.ts#L56)
   - Changed from a single `eventId` index to a compound unique index on `(eventId, email)`
   - This prevents duplicate bookings by the same email for the same event

### 2. **Email Normalization**
   - Email is already normalized with `lowercase: true` and `trim: true` in the schema
   - This ensures consistent lookups regardless of whitespace or case variations

### 3. **Index Post-Initialization Hook**
   - Added a `post('init')` hook that attempts to create the unique index on document initialization
   - Includes error handling for existing indexes or duplicate data scenarios

### 4. **Deduplication Function**
   - Added `deduplicateAndRebuildIndexes()` async function for handling legacy data
   - **Features**:
     - Finds all duplicate `(eventId, email)` pairs
     - Keeps the first occurrence, removes duplicates
     - Drops and recreates all indexes (except `_id`)
     - Creates the new compound unique index
     - Logs all operations for audit trail

### 5. **Migration Utility**
   - **New file**: [database/migrations.ts](database/migrations.ts)
   - Provides `runMigrations()` function for centralized startup migrations
   - Currently handles booking deduplication and index rebuilds

### 6. **Updated Exports**
   - [database/index.ts](database/index.ts) now exports:
     - `deduplicateAndRebuildIndexes` - Direct function call
     - `runMigrations` - Comprehensive migration runner

## How to Use

### Option A: Automatic (Recommended for most cases)
Call the migration during application startup in your layout or initialization code:

```typescript
import { runMigrations } from '@/database';

// In your app initialization (e.g., app/layout.tsx or a startup route handler)
try {
  await runMigrations();
} catch (error) {
  console.error('Migration failed:', error);
  // Handle error appropriately for your app
}

// Or in an async initializer:
async function initializeApp() {
  try {
    await runMigrations();
  } catch (error) {
    console.error('Migration failed:', error);
    throw error; // Re-throw or handle as needed
  }
}
```

### Option B: Manual for existing data
If you have existing data with duplicates:

```typescript
import { deduplicateAndRebuildIndexes } from '@/database';

// Call once during maintenance
await deduplicateAndRebuildIndexes();
```

### Option C: One-time CLI command
Create a Node.js script to run migrations without starting the full app:

```typescript
import { connectToDatabase } from '@/lib/mongodb';
import { runMigrations } from '@/database';

async function main() {
  await connectToDatabase();
  await runMigrations();
  process.exit(0);
}

main().catch(error => {
  console.error('Migration error:', error);
  process.exit(1);
});
```

## What Changed in the Schema

**Before:**
```typescript
eventId: {
  type: Schema.Types.ObjectId,
  ref: 'Event',
  required: true,
  index: true, // Single index on eventId only
},
```

**After:**
```typescript
eventId: {
  type: Schema.Types.ObjectId,
  ref: 'Event',
  required: true,
},
// Compound unique index defined separately:
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });
```

## Error Handling

- **Duplicate insertion attempts**: MongoDB will throw a `MongoError` with code 11000 (duplicate key error) when trying to insert a duplicate `(eventId, email)` pair
- **Deduplication logs**: All removed duplicates are logged with event ID and email for auditing
- **Index creation failures**: Handled gracefully with warnings if the index already exists

## Next Steps

1. Deploy these changes to your codebase
2. Call `runMigrations()` during your next application startup (once)
3. Monitor logs for any duplicate removals
4. All future bookings will be validated by the unique index
