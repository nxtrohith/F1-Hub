import { Schema, model, models, Document, Model } from 'mongoose';

/**
 * Event domain shape without Mongoose-specific fields.
 */
export interface EventAttrs {
  title: string;
  slug: string;
  description: string;
  image: string;
  venue: string;
  location: string;
  date: string; // Stored as normalized ISO date string (YYYY-MM-DD)
  time: string; // Stored as normalized time string (HH:mm)
  mode: string; // e.g., "online", "offline", "hybrid"
  organizer: string;
  tags: string[];
}

/**
 * Event document type including Mongoose document fields & timestamps.
 */
export interface EventDoc extends EventAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type EventModel = Model<EventDoc>;

/**
 * Create a URL-friendly slug from a title.
 */
const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    // Replace non-alphanumeric characters with a dash
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing dashes
    .replace(/^-+|-+$/g, '');
};

/**
 * Normalize a date string to ISO (YYYY-MM-DD) and validate it.
 * Accepts YYYY-MM-DD or ISO-with-timezone; always returns UTC date.
 */
const normalizeDate = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('Event date is required.');
  }

  // Check for strict YYYY-MM-DD format
  const strictMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (strictMatch) {
    const year = Number.parseInt(strictMatch[1], 10);
    const month = Number.parseInt(strictMatch[2], 10);
    const day = Number.parseInt(strictMatch[3], 10);

    // Validate ranges
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error(`Invalid event date: ${value}`);
    }

    // Construct UTC date and validate it's a real date
    const utcTimestamp = Date.UTC(year, month - 1, day);
    const date = new Date(utcTimestamp);
    
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid event date: ${value}`);
    }

    // Verify the date components match (catches invalid dates like 2025-02-31)
    if (date.getUTCFullYear() !== year || 
        date.getUTCMonth() !== month - 1 || 
        date.getUTCDate() !== day) {
      throw new Error(`Invalid event date: ${value}`);
    }

    return date.toISOString().slice(0, 10);
  }

  // Try parsing as ISO-with-timezone (e.g., 2025-12-25T00:00:00Z)
  const isoMatch = trimmed.match(/^\d{4}-\d{2}-\d{2}T/);
  if (isoMatch) {
    const date = new Date(trimmed);
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid event date: ${value}`);
    }
    return date.toISOString().slice(0, 10);
  }

  // If format doesn't match expected patterns, reject it
  throw new Error(`Invalid event date format: ${value}. Expected YYYY-MM-DD or ISO format.`);
};

/**
 * Normalize time to HH:mm (24-hour) and validate it.
 */
const normalizeTime = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('Event time is required.');
  }

  // Accept formats like H, HH, H:mm, HH:mm
  const match = trimmed.match(/^(\d{1,2})(?::(\d{1,2}))?$/);
  if (!match) {
    throw new Error(`Invalid event time: ${value}`);
  }

  const hours = Number.parseInt(match[1], 10);
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0;

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error(`Invalid event time: ${value}`);
  }

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');

  return `${hh}:${mm}`;
};

/**
 * Ensure required string fields are present and non-empty.
 */
const assertNonEmpty = (fieldName: keyof EventAttrs, value: string): void => {
  if (!value || !value.trim()) {
    throw new Error(`Field "${String(fieldName)}" is required.`);
  }
};

const eventSchema = new Schema<EventDoc, EventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true },
    mode: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  {
    timestamps: true,
    strict: true,
  },
);


/**
 * Pre-save hook to:
 * - Validate and normalize required fields
 * - Generate a URL-friendly slug from the title (only when the title changes)
 * - Normalize date and time into consistent formats
 */
eventSchema.pre<EventDoc>('save', function preSave() {
  // Validate required string fields manually to avoid empty strings.
  assertNonEmpty('title', this.title);
  assertNonEmpty('description', this.description);
  assertNonEmpty('image', this.image);
  assertNonEmpty('venue', this.venue);
  assertNonEmpty('location', this.location);
  assertNonEmpty('mode', this.mode);
  assertNonEmpty('organizer', this.organizer);

  if (!Array.isArray(this.tags) || this.tags.length === 0) {
    throw new Error('Field "tags" must be a non-empty array.');
  }

  // Only regenerate the slug when the title has changed or slug is missing.
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }

  // Normalize date and time to consistent formats.
  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event: EventModel = (models.Event as EventModel) || model<EventDoc, EventModel>('Event', eventSchema);

export default Event;
