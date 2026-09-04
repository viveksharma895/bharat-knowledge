import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { QueryPeopleDto } from './dto/query-people.dto';
import { PersonStatus } from './schemas/person.schema';

vi.mock('@nestjs/mongoose', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@nestjs/mongoose')>();
  return {
    ...actual,
    MongooseModule: {
      forFeature: vi.fn().mockReturnValue({ module: class MockModule {} }),
    },
  };
});

const mockPerson = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Test Person',
  slug: 'test-person',
  aliases: [],
  shortBio: 'Test bio.',
  biography: 'Full biography.',
  status: PersonStatus.DRAFT,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPeopleService = {
  create: vi.fn().mockResolvedValue(mockPerson),
  findAll: vi.fn().mockResolvedValue({
    data: [mockPerson],
    pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
  }),
  findBySlug: vi.fn().mockResolvedValue(mockPerson),
  update: vi.fn().mockResolvedValue({ ...mockPerson, shortBio: 'Updated' }),
  remove: vi.fn().mockResolvedValue(mockPerson),
};

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a person', async () => {
      const createDto: CreatePersonDto = {
        name: 'Test Person',
        slug: 'test-person',
      };

      const result = await controller.create(createDto);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Person created successfully');
      expect(result.data).toEqual(mockPerson);
    });
  });

  describe('findAll', () => {
    it('should return paginated people', async () => {
      const query: QueryPeopleDto = { page: 1, limit: 20 };
      const result = await controller.findAll(query);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('findBySlug', () => {
    it('should return a person by slug', async () => {
      const result = await controller.findBySlug('test-person');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPerson);
    });
  });

  describe('update', () => {
    it('should update a person', async () => {
      const updateDto: UpdatePersonDto = { shortBio: 'Updated bio' };
      const result = await controller.update('507f1f77bcf86cd799439011', updateDto);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Person updated successfully');
    });
  });

  describe('remove', () => {
    it('should delete a person', async () => {
      const result = await controller.remove('507f1f77bcf86cd799439011');
      expect(result.success).toBe(true);
      expect(result.message).toBe('Person deleted successfully');
    });
  });
});
