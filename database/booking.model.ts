import { Schema, model, models, Document, Model, Types } from 'mongoose';
import { Event, EventModel } from './event.model';

/**
 * Booking domain shape without Mongoose-specific fields.
 */
export interface BookingAttrs {
  eventId: Types.ObjectId;
  email: string;
}

/**
 * Booking document type including Mongoose document fields & timestamps.
 */
export interface BookingDoc extends BookingAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type BookingModel = Model<BookingDoc>;

/**
 * Basic email format validation.
 */
const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  // Simple, pragmatic email regex suitable for backend validation.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
};

const bookingSchema = new Schema<BookingDoc, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

/**
 * Compound unique index on (eventId, email) to enforce uniqueness.
 * Prevents duplicate bookings by the same email for the same event.
 */
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Pre-save hook to:
 * - Ensure the referenced event exists
 * - Validate the email format
 */
bookingSchema.pre<BookingDoc>('save', async function preSave() {
  if (!this.eventId) {
    throw new Error('Booking must reference an eventId.');
  }

  if (!isValidEmail(this.email)) {
    throw new Error('Invalid email address.');
  }

    if (this.isNew) {
      const eventModel: EventModel = Event;
      const eventExists = await eventModel.exists({ _id: this.eventId });
      if (!eventExists) {
        throw new Error('Cannot create booking: referenced event does not exist.');
      }
    }
});

/**
 * Post-initialization: handle index creation and deduplication if needed.
 * This ensures the unique compound index is applied and removes duplicates if present.
 */
bookingSchema.post('init', async function () {
  // Re-create the index on model initialization to ensure it exists
  if (this.collection) {
    try {
      await this.collection.createIndex(
        { eventId: 1, email: 1 },
        { unique: true }
      );
    } catch (error) {
      // Index may already exist or have duplicates; handled by deduplication
      console.warn(
        'Compound unique index creation attempted (may already exist or have conflicts)'
      );
    }
  }
});

/**
 * Async function to deduplicate and rebuild indexes.
 * Call this during application startup if dealing with legacy data.
 */
export async function deduplicateAndRebuildIndexes(): Promise<void> {
  try {
    const BookingModel = models.Booking || model<BookingDoc, BookingModel>('Booking', bookingSchema);
    
    // Find duplicates: group by (eventId, email) and keep only the first
    const duplicates = await BookingModel.aggregate([
      {
        $group: {
          _id: { eventId: '$eventId', email: '$email' },
          ids: { $push: '$_id' },
          count: { $sum: 1 },
        },
      },
      {
        $match: { count: { $gt: 1 } },
      },
    ]);

    // Remove duplicate documents, keeping only the first occurrence
    for (const dup of duplicates) {
      const idsToDelete = dup.ids.slice(1); // Keep first, delete rest
      if (idsToDelete.length > 0) {
        await BookingModel.deleteMany({ _id: { $in: idsToDelete } });
        console.log(
          `Removed ${idsToDelete.length} duplicate booking(s) for eventId: ${dup._id.eventId}, email: ${dup._id.email}`
        );
      }
    }

    // Drop existing indexes (except the default _id index)
    const existingIndexes = await BookingModel.collection.getIndexes();
    for (const indexName of Object.keys(existingIndexes)) {
      if (indexName !== '_id_') {
        await BookingModel.collection.dropIndex(indexName);
      }
    }

    // Create the compound unique index
    await BookingModel.collection.createIndex(
      { eventId: 1, email: 1 },
      { unique: true }
    );

    console.log('Booking indexes rebuilt successfully.');
  } catch (error) {
    console.error('Error during deduplication and index rebuild:', error);
    throw error;
  }
}

export const Booking: BookingModel =
  (models.Booking as BookingModel) || model<BookingDoc, BookingModel>('Booking', bookingSchema);

export default Booking;
