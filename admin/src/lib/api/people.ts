import { api } from './client';
import type {
  Person,
  PersonStatus,
  PaginatedResponse,
  SingleResponse,
  DeleteResponse,
  ListParams,
} from '@/types/people';

function buildQueryString(params: ListParams): string {
  const sp = new URLSearchParams();
  if (params.page) sp.set('page', String(params.page));
  if (params.limit) sp.set('limit', String(params.limit));
  if (params.search) sp.set('search', params.search);
  if (params.status) sp.set('status', params.status);
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export const peopleApi = {
  list(params: ListParams = {}) {
    const qs = buildQueryString(params);
    return api.get<PaginatedResponse<Person>>(`/admin/people${qs}`);
  },

  getBySlug(slug: string) {
    return api.get<SingleResponse<Person>>(`/people/${encodeURIComponent(slug)}`);
  },

  create(data: Partial<Person>) {
    return api.post<SingleResponse<Person>>('/admin/people', data);
  },

  update(id: string, data: Partial<Person>) {
    return api.patch<SingleResponse<Person>>(`/admin/people/${id}`, data);
  },

  remove(id: string) {
    return api.delete<DeleteResponse>(`/admin/people/${id}`);
  },
};

export type { PersonStatus };

export const STATUS_OPTIONS: { value: PersonStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];
