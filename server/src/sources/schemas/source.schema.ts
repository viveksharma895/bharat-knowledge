import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SourceDocument = HydratedDocument<Source>;

export enum SourceType {
  GOVERNMENT = 'government',
  OFFICIAL = 'official',
  COURT = 'court',
  PARLIAMENT = 'parliament',
  ELECTION = 'election',
  RESEARCH = 'research',
  UNIVERSITY = 'university',
  BOOK = 'book',
  NEWS = 'news',
  ORGANIZATION = 'organization',
  DATABASE = 'database',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class Source {
  @Prop({ required: true, trim: true, maxlength: 300, index: true })
  name: string;

  @Prop({
    required: true,
    trim: true,
    match: /^https?:\/\/.+/i,
    index: true,
  })
  url: string;

  @Prop({
    type: String,
    enum: Object.values(SourceType),
    required: true,
    index: true,
  })
  sourceType: SourceType;

  @Prop({ trim: true, maxlength: 300 })
  publisher?: string;

  @Prop({ trim: true, maxlength: 1000 })
  description?: string;

  @Prop({ trim: true, maxlength: 200 })
  license?: string;

  @Prop({ trim: true, match: /^https?:\/\/.+/i })
  licenseUrl?: string;

  @Prop({ type: Boolean, default: true })
  attributionRequired: boolean;

  @Prop({ type: Boolean, default: false })
  commercialUseAllowed: boolean;

  @Prop({ type: Boolean, default: false })
  redistributionAllowed: boolean;

  /** Editorial review status, not an automatic trust score. */
  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date })
  lastCheckedAt?: Date;
}

export const SourceSchema = SchemaFactory.createForClass(Source);
