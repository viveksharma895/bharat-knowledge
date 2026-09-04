import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Person, PersonDocument, PersonStatus } from './schemas/person.schema';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  /**
   * Create a new person.
   *
   * FUTURE: In the public API, only published records will be returned.
   * Admin API will allow drafts/reviews. This is not enforced yet.
   */
  async create(createPersonDto: CreatePersonDto): Promise<PersonDocument> {
    try {
      const person = new this.personModel(createPersonDto);
      return await person.save();
    } catch (error: unknown) {
      if (this.isMongoDuplicateKeyError(error)) {
        throw new ConflictException('A person with this slug already exists.');
      }
      throw error;
    }
  }

  /**
   * List people with pagination, search, and filtering.
   *
   * When `publishedOnly` is true, only published records are returned
   * regardless of the `status` query parameter. This enforces the
   * public API security rule: unpublished data must never leak.
   */
  async findAll(
    query: QueryPeopleDto,
    options?: { publishedOnly?: boolean },
  ): Promise<PaginatedResult<PersonDocument>> {
    const { page = 1, limit = 20, search, status } = query;

    const filter: FilterQuery<PersonDocument> = {};

    if (options?.publishedOnly) {
      filter.status = PersonStatus.PUBLISHED;
    } else if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { aliases: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.personModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.personModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find a single person by slug.
   *
   * This is exposed through the public API, so the query enforces
   * `status: published` in the database layer. This guarantees that
   * draft/review/archived records can never be returned publicly —
   * accessing one via its slug behaves as a 404.
   */
  async findBySlug(slug: string): Promise<PersonDocument> {
    const person = await this.personModel
      .findOne({ slug, status: PersonStatus.PUBLISHED })
      .exec();
    if (!person) {
      throw new NotFoundException(`Person with slug "${slug}" not found.`);
    }
    return person;
  }

  /**
   * Find a single person by ID.
   */
  async findById(id: string): Promise<PersonDocument> {
    const person = await this.personModel.findById(id).exec();
    if (!person) {
      throw new NotFoundException(`Person with id "${id}" not found.`);
    }
    return person;
  }

  /**
   * Update a person by ID with partial data.
   */
  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<PersonDocument> {
    try {
      const person = await this.personModel
        .findByIdAndUpdate(id, { $set: updatePersonDto }, { new: true, runValidators: true })
        .exec();
      if (!person) {
        throw new NotFoundException(`Person with id "${id}" not found.`);
      }
      return person;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (this.isMongoDuplicateKeyError(error)) {
        throw new ConflictException('A person with this slug already exists.');
      }
      throw error;
    }
  }

  /**
   * Delete a person by ID.
   *
   * FUTURE: In production, this should become a soft-delete/archive workflow
   * rather than permanent deletion, since Bharat Knowledge is an editorial
   * knowledge platform where records represent historical knowledge.
   */
  async remove(id: string): Promise<PersonDocument> {
    const person = await this.personModel.findByIdAndDelete(id).exec();
    if (!person) {
      throw new NotFoundException(`Person with id "${id}" not found.`);
    }
    return person;
  }

  private isMongoDuplicateKeyError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    );
  }
}
