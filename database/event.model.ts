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
 */
const normalizeDate = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('Event date is required.');
  }

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid event date: ${value}`);
  }

  // Only keep the date portion, drop time and timezone.
  return date.toISOString().slice(0, 10);
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
    date: { type: String, required: true },
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

// Additional safeguard unique index for slug (alongside the schema definition).
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook to:
 * - Validate and normalize required fields
 * - Generate a URL-friendly slug from the title (only when the title changes)
 * - Normalize date and time into consistent formats
 */
eventSchema.pre<EventDoc>('save', function preSave(next) {
  try {
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

    next();
  } catch (err) {
    next(err as Error);
  }
});

export const Event: EventModel = (models.Event as EventModel) || model<EventDoc, EventModel>('Event', eventSchema);

export default Event;
