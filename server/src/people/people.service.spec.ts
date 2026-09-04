import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PeopleService } from './people.service';
import { PersonStatus } from './schemas/person.schema';
import { CreatePersonDto } from './dto/create-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

vi.mock('@nestjs/mongoose', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@nestjs/mongoose')>();
  return {
    ...actual,
    MongooseModule: {
      forFeature: vi.fn().mockReturnValue({ module: class MockModule {} }),
    },
  };
});

const mockPersonData = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Test Person',
  slug: 'test-person',
  aliases: [],
  shortBio: 'Test bio.',
  biography: 'Full biography.',
  dateOfBirth: new Date('1973-04-24'),
  dateOfDeath: null,
  placeOfBirth: 'Mumbai, India',
  nationality: ['Indian'],
  occupations: ['Cricketer'],
  categories: [],
  image: {},
  status: PersonStatus.DRAFT,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSave = vi.fn().mockResolvedValue(mockPersonData);

function MockPersonModel(this: any, dto: any) {
  this.save = mockSave;
  Object.assign(this, dto);
}

MockPersonModel.find = vi.fn();
MockPersonModel.findOne = vi.fn();
MockPersonModel.findById = vi.fn();
MockPersonModel.findByIdAndUpdate = vi.fn();
MockPersonModel.findByIdAndDelete = vi.fn();
MockPersonModel.countDocuments = vi.fn();

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockSave.mockResolvedValue(mockPersonData);
    MockPersonModel.find.mockReturnValue({
      sort: vi.fn(() => ({
        skip: vi.fn(() => ({
          limit: vi.fn(() => ({ exec: vi.fn().mockResolvedValue([mockPersonData]) })),
        })),
      })),
    });
    MockPersonModel.countDocuments.mockReturnValue({
      exec: vi.fn().mockResolvedValue(1),
    });
    MockPersonModel.findOne.mockReturnValue({
      exec: vi.fn().mockResolvedValue(mockPersonData),
    });
    MockPersonModel.findById.mockReturnValue({
      exec: vi.fn().mockResolvedValue(mockPersonData),
    });
    MockPersonModel.findByIdAndUpdate.mockReturnValue({
      exec: vi.fn().mockResolvedValue(mockPersonData),
    });
    MockPersonModel.findByIdAndDelete.mockReturnValue({
      exec: vi.fn().mockResolvedValue(mockPersonData),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getModelToken('Person'),
          useValue: MockPersonModel,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a person', async () => {
      const dto: CreatePersonDto = { name: 'Test Person', slug: 'test-person' };
      const result = await service.create(dto);
      expect(result).toBeDefined();
    });

    it('should throw ConflictException on duplicate slug', async () => {
      const dto: CreatePersonDto = { name: 'Test Person', slug: 'test-person' };
      const error = new Error('Duplicate key') as any;
      error.code = 11000;
      mockSave.mockRejectedValueOnce(error);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const query: QueryPeopleDto = { page: 1, limit: 10 };
      const result = await service.findAll(query);
      expect(result.data).toBeDefined();
      expect(result.pagination.page).toEqual(1);
      expect(result.pagination.limit).toEqual(10);
      expect(result.pagination.total).toEqual(1);
    });
  });

  describe('findBySlug', () => {
    it('should return a person by slug', async () => {
      MockPersonModel.findOne.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(mockPersonData),
      });

      const result = await service.findBySlug('test-person');
      expect(result.slug).toEqual('test-person');
    });

    it('should throw NotFoundException when slug not found', async () => {
      MockPersonModel.findOne.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(service.findBySlug('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a person', async () => {
      const updatedPerson = { ...mockPersonData, shortBio: 'Updated bio' };
      MockPersonModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(updatedPerson),
      });

      const result = await service.update('507f1f77bcf86cd799439011', {
        shortBio: 'Updated bio',
      });
      expect(result.shortBio).toEqual('Updated bio');
    });

    it('should throw NotFoundException when person not found', async () => {
      MockPersonModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(
        service.update('507f1f77bcf86cd799439011', { shortBio: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException on duplicate slug during update', async () => {
      const error = new Error('Duplicate key') as any;
      error.code = 11000;
      MockPersonModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: vi.fn().mockRejectedValue(error),
      });

      await expect(
        service.update('507f1f77bcf86cd799439011', { slug: 'existing-slug' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should delete a person', async () => {
      const result = await service.remove('507f1f77bcf86cd799439011');
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException when person not found', async () => {
      MockPersonModel.findByIdAndDelete.mockReturnValueOnce({
        exec: vi.fn().mockResolvedValue(null),
      });

      await expect(
        service.remove('507f1f77bcf86cd799439011'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
