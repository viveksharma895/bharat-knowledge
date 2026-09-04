const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

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
  categories: { slug: string; label?: string }[];
  image?: {
    url: string;
    alt: string;
    caption: string;
    license: string;
    source: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse {
  success: boolean;
  data: Person[];
  pagination: Pagination;
}

export interface SingleResponse {
  success: boolean;
  data: Person;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
}

export class ApiRequestError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "ApiRequestError";
    this.statusCode = statusCode;
  }
}

export async function fetchPeople(params: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);

  const url = `${API_BASE}/people${searchParams.toString() ? `?${searchParams}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      success: false,
      message: "Failed to fetch people",
      statusCode: res.status,
    }));
    throw new ApiRequestError(
      error.message || `HTTP ${res.status}`,
      error.statusCode ?? res.status,
    );
  }

  return res.json();
}

/**
 * Fetch a single published person by slug from the public API.
 * A 404 (published-only enforcement or unknown slug) throws an
 * ApiRequestError with statusCode 404 so callers can render
 * a proper "Not Found" view without leaking unpublished data.
 */
export async function fetchPersonBySlug(slug: string): Promise<SingleResponse> {
  const url = `${API_BASE}/people/${encodeURIComponent(slug)}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      success: false,
      message: "Failed to fetch person",
      statusCode: res.status,
    }));
    throw new ApiRequestError(
      error.message || `HTTP ${res.status}`,
      error.statusCode ?? res.status,
    );
  }

  return res.json();
}
