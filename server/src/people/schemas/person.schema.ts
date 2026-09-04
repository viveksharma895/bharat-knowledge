import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonDocument = HydratedDocument<Person>;

export enum PersonStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface PersonImage {
  url: string;
  alt: string;
  caption: string;
  license: string;
  source: string;
}

/**
 * A Category reference. Initially points to a category identity so it can be
 * upgraded to a real Category model later without redesigning Person.
 */
export interface CategoryRef {
  /** Stable public slug, e.g. "politics". */
  slug: string;
  /** Optional display name for convenience in admin/UI. */
  label?: string;
}

@Schema({ timestamps: true })
export class Person {
  @Prop({ required: true, trim: true, maxlength: 200 })
  name: string;

  @Prop({ required: true, unique: true, index: true, trim: true, lowercase: true })
  slug: string;

  @Prop({ type: [String], default: [] })
  aliases: string[];

  @Prop({ trim: true, maxlength: 500 })
  shortBio?: string;

  @Prop({ trim: true })
  biography?: string;

  @Prop({ type: Date })
  dateOfBirth?: Date;

  @Prop({ type: Date })
  dateOfDeath?: Date;

  @Prop()
  placeOfBirth?: string;

  @Prop({ type: [String], default: [] })
  nationality: string[];

  @Prop({ type: [String], default: [] })
  occupations: string[];

  @Prop({ type: [Object], default: [] })
  categories: CategoryRef[];

  @Prop({
    type: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
      caption: { type: String, default: '' },
      license: { type: String, default: '' },
      source: { type: String, default: '' },
    },
    _id: false,
    default: () => ({}),
  })
  image?: PersonImage;

  @Prop({
    type: String,
    enum: Object.values(PersonStatus),
    default: PersonStatus.DRAFT,
    index: true,
  })
  status: PersonStatus;
}

export const PersonSchema = SchemaFactory.createForClass(Person);

PersonSchema.index({ name: 1 });
