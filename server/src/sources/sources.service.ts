import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Source, SourceDocument } from './schemas/source.schema';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source.name) private readonly sourceModel: Model<SourceDocument>,
  ) {}

  getModel(): Model<SourceDocument> {
    return this.sourceModel;
  }
}
