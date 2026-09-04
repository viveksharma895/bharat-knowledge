"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PersonCard from "@/components/people/PersonCard";
import PersonCardSkeleton from "@/components/people/PersonCardSkeleton";
import Pagination from "@/components/people/Pagination";
import { fetchPeople, type Person, type Pagination as PaginationInfo } from "@/lib/api";

export default function PeopleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const currentSearch = searchParams.get("search") || "";

  const [people, setPeople] = useState<Person[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const loadPeople = useCallback(async (page: number, search: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPeople({ page, limit: 20, search });
      setPeople(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load people.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople(currentPage, currentSearch);
  }, [currentPage, currentSearch, loadPeople]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const updateParams = (page: number, search: string) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (search) params.set("search", search);
    router.push(`/people${params.toString() ? `?${params}` : ""}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    updateParams(page, currentSearch);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams(1, value);
    }, 400);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateParams(1, searchValue);
  };

  const handleRetry = () => {
    loadPeople(currentPage, currentSearch);
  };

  const isEmpty = !loading && people.length === 0;
  const hasSearch = currentSearch.trim().length > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-brand-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-brand-slate">
              <li>
                <a href="/" className="hover:text-brand-navy transition-colors">
                  Home
                </a>
              </li>
              <li>
                <span className="material-symbols-outlined text-[16px] text-brand-border">
                  chevron_right
                </span>
              </li>
              <li className="font-semibold text-brand-navy" aria-current="page">
                People
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-tight mb-3">
                People
              </h1>
              <p className="text-base sm:text-lg text-brand-slate leading-relaxed">
                Explore notable people and public figures documented by Bharat Knowledge.
              </p>
            </div>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-xl"
            role="search"
          >
            <label htmlFor="people-search" className="sr-only">
              Search people
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-brand-slate/60">
                search
              </span>
              <input
                id="people-search"
                type="search"
                placeholder="Search by name..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-border/70 bg-white text-brand-navy placeholder:text-brand-slate/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron/30 focus:border-brand-saffron transition-all"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    updateParams(1, "");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-brand-cream-warm transition-colors"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px] text-brand-slate">
                    close
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Result count */}
        {!loading && !error && (
          <p className="text-sm text-brand-slate mb-6">
            {pagination.total === 0
              ? hasSearch
                ? "No results found."
                : "No published people yet."
              : `Showing ${people.length} of ${pagination.total} ${pagination.total === 1 ? "person" : "people"}${hasSearch ? ` for "${currentSearch}"` : ""}`}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PersonCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-brand-slate/40 mb-4 block">
              error
            </span>
            <p className="text-brand-slate text-sm mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-saffron transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && isEmpty && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-brand-slate/40 mb-4 block">
              {hasSearch ? "search_off" : "people"}
            </span>
            <p className="text-brand-slate text-sm mb-2">
              {hasSearch
                ? `No people found for "${currentSearch}".`
                : "No published people yet."}
            </p>
            {hasSearch && (
              <button
                onClick={() => {
                  setSearchValue("");
                  updateParams(1, "");
                }}
                className="text-sm text-brand-saffron font-semibold hover:underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && people.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {people.map((person) => (
                <PersonCard key={person._id} person={person} />
              ))}
            </div>

            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </>
  );
}
