import { Schema, model, models, Document, Model } from 'mongoose';
import slugifyLib from 'slugify';

/**
 * Team domain shape without Mongoose-specific fields.
 */
export interface TeamAttrs {
  teamname: string;
  driver1: string;
  driver2: string;
  carmodel: string;
  carimage: string;
  firstentry: string;
  headquarters: string;
  teamlogo: string;
  driver1img: string;
  driver2img: string;
  driver1cha: string;
  driver2cha: string;
  chief: string;
  powerunit: string;
  championships: string;
  slug: string;
}

/**
 * Team document type including Mongoose document fields & timestamps.
 */
export interface TeamDoc extends TeamAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type TeamModel = Model<TeamDoc>;

/**
 * Create a URL-friendly slug from a team name.
 */
const slugify = (value: string): string => {
  return slugifyLib(value, {
    lower: true,
    strict: true,
    trim: true,
  });
};

/**
 * Ensure required string fields are present and non-empty.
 */
const assertNonEmpty = (fieldName: keyof TeamAttrs, value: string): void => {
  if (!value || !value.trim()) {
    throw new Error(`Field "${String(fieldName)}" is required.`);
  }
};

const teamSchema = new Schema<TeamDoc, TeamModel>(
  {
    teamname: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true, required: false },
    driver1: { type: String, required: true, trim: true },
    driver2: { type: String, required: true, trim: true },
    carmodel: { type: String, required: true, trim: true },
    carimage: { type: String, required: true, trim: true },
    firstentry: { type: String, required: true, trim: true },
    headquarters: { type: String, required: true, trim: true },
    teamlogo: { type: String, required: true, trim: true },
    driver1img: { type: String, required: true, trim: true },
    driver2img: { type: String, required: true, trim: true },
    driver1cha: { type: String, required: true, trim: true },
    driver2cha: { type: String, required: true, trim: true },
    chief: { type: String, required: true, trim: true },
    powerunit: { type: String, required: true, trim: true },
    championships: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    strict: true,
  },
);

/**
 * Pre-save hook to:
 * - Validate required fields are present and non-empty
 * - Generate a URL-friendly slug from teamname (only when teamname changes)
 */
teamSchema.pre<TeamDoc>('save', function preSave() {
  // Validate all required string fields
  assertNonEmpty('teamname', this.teamname);
  assertNonEmpty('driver1', this.driver1);
  assertNonEmpty('driver2', this.driver2);
  assertNonEmpty('carmodel', this.carmodel);
  assertNonEmpty('carimage', this.carimage);
  assertNonEmpty('firstentry', this.firstentry);
  assertNonEmpty('headquarters', this.headquarters);
  assertNonEmpty('teamlogo', this.teamlogo);
  assertNonEmpty('driver1img', this.driver1img);
  assertNonEmpty('driver2img', this.driver2img);
  assertNonEmpty('driver1cha', this.driver1cha);
  assertNonEmpty('driver2cha', this.driver2cha);
  assertNonEmpty('chief', this.chief);
  assertNonEmpty('powerunit', this.powerunit);
  assertNonEmpty('championships', this.championships);


  // Generate slug from teamname only when teamname changes or slug is missing
  if (this.isModified('teamname') || !this.slug) {
    this.slug = slugify(this.teamname);
  }
});

export const Teams: TeamModel =
  (models.Teams as TeamModel) || model<TeamDoc, TeamModel>('Teams', teamSchema);

export default Teams;
