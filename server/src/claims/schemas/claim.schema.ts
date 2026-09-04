import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ClaimDocument = HydratedDocument<Claim>;

export enum ClaimEntityType {
  PERSON = 'person',
}

export enum ClaimVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  NEEDS_REVIEW = 'needs_review',
}

export type ClaimValueType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'object'
  | 'array'
  | 'reference';

/** Structured value discriminated by `valueType` for extensibility. */
export interface ClaimValue {
  valueType: ClaimValueType;
  value: string | number | boolean | Date | Record<string, unknown> | unknown[];
  /** For valueType = 'reference': the referenced collection. */
  referenceTo?: string;
}

@Schema({ timestamps: true })
export class Claim {
  @Prop({
    type: String,
    enum: Object.values(ClaimEntityType),
    required: true,
  })
  entityType: ClaimEntityType;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Person' })
  entityId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 200 })
  property: string;

  @Prop({
    type: {
      valueType: {
        type: String,
        enum: ['string', 'number', 'boolean', 'date', 'object', 'array', 'reference'],
        required: true,
      },
      value: { type: MongooseSchema.Types.Mixed, required: true },
      referenceTo: { type: String },
    },
    _id: false,
    required: true,
  })
  value: ClaimValue;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Source' }], default: [] })
  sources: Types.ObjectId[];

  @Prop({
    type: String,
    enum: Object.values(ClaimVerificationStatus),
    default: ClaimVerificationStatus.PENDING,
    index: true,
  })
  verificationStatus: ClaimVerificationStatus;

  /** 0-1 editorial confidence. Clearly separate from verificationStatus. */
  @Prop({ type: Number, min: 0, max: 1 })
  confidence?: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy?: Types.ObjectId;

  @Prop({ type: Date })
  reviewedAt?: Date;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);

ClaimSchema.index({ entityType: 1, entityId: 1 });
ClaimSchema.index({ 'value.valueType': 1 });
