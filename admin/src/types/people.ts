export type PersonStatus = 'draft' | 'review' | 'published' | 'archived';

export interface PersonImage {
  url: string;
  alt: string;
  caption: string;
  license: string;
  source: string;
}

export interface CategoryRef {
  slug: string;
  label?: string;
}

export interface Person {
  _id: string;
  name: string;
  slug: string;
  aliases: string[];
  shortBio?: string;
  biography?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  placeOfBirth?: string;
  nationality: string[];
  occupations: string[];
  categories: CategoryRef[];
  image?: PersonImage;
  status: PersonStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: PersonStatus;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
