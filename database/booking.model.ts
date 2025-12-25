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
      index: true, // Index for faster lookups by event
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
 * Pre-save hook to:
 * - Ensure the referenced event exists
 * - Validate the email format
 */
bookingSchema.pre<BookingDoc>('save', async function preSave(next) {
  try {
    if (!this.eventId) {
      throw new Error('Booking must reference an eventId.');
    }

    // Validate email format early to avoid creating invalid records.
    if (!isValidEmail(this.email)) {
      throw new Error('Invalid email address.');
    }

    // Ensure the referenced event exists before saving the booking.
    const eventModel: EventModel = Event;
    const eventExists = await eventModel.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error('Cannot create booking: referenced event does not exist.');
    }

    next();
  } catch (err) {
    next(err as Error);
  }
});

export const Booking: BookingModel =
  (models.Booking as BookingModel) || model<BookingDoc, BookingModel>('Booking', bookingSchema);

export default Booking;
