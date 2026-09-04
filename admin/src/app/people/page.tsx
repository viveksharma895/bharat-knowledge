'use client';

import { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PeopleTable } from '@/components/people/people-table';
import { PeopleTableSkeleton } from '@/components/people/people-table-skeleton';
import { Pagination } from '@/components/people/pagination';
import { DeletePersonDialog } from '@/components/people/delete-dialog';
import { peopleApi, STATUS_OPTIONS } from '@/lib/api/people';
import { ApiClientError } from '@/lib/api/client';
import { showToast, ToastContainer } from '@/components/ui/toast';
import type { Person, PersonStatus } from '@/types/people';
import { Plus, Search, AlertCircle, RefreshCw, Users } from 'lucide-react';

export default function PeopleListPage() {
  return (
    <Suspense fallback={<PeoplePageSkeleton />}>
      <PeopleListContent />
    </Suspense>
  );
}

function PeoplePageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-24 rounded bg-muted animate-pulse" />
          <div className="h-4 w-48 rounded bg-muted animate-pulse mt-2" />
        </div>
        <div className="h-8 w-28 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-64 rounded bg-muted animate-pulse" />
        <div className="h-8 w-36 rounded bg-muted animate-pulse" />
      </div>
      <PeopleTableSkeleton />
    </div>
  );
}

function PeopleListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = (searchParams.get('status') as PersonStatus | 'all') || 'all';

  const [people, setPeople] = useState<Person[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState<PersonStatus | 'all'>(initialStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Person | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  const hasFilters = search !== '' || (status !== 'all');

  const fetchPeople = useCallback(
    async (p: number, s: string, st: PersonStatus | 'all') => {
      setLoading(true);
      setError(null);
      try {
        const params: {
          page: number;
          limit: number;
          search?: string;
          status?: PersonStatus;
        } = { page: p, limit: 20 };
        if (s) params.search = s;
        if (st && st !== 'all') params.status = st;

        const res = await peopleApi.list(params);
        setPeople(res.data);
        setTotalPages(res.pagination.totalPages);
        setTotal(res.pagination.total);
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(`API error: ${err.message}`);
        } else {
          setError(
            'Unable to connect to the Bharat Knowledge API. Please check the server and try again.',
          );
        }
        setPeople([]);
        setTotalPages(1);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchPeople(page, search, status);
  }, [page, fetchPeople, search, status]);

  function updateUrl(p: number, s: string, st: string) {
    const sp = new URLSearchParams();
    if (p > 1) sp.set('page', String(p));
    if (s) sp.set('search', s);
    if (st && st !== 'all') sp.set('status', st);
    const qs = sp.toString();
    router.replace(`/people${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setPage(1);
      updateUrl(1, value, status);
    }, 400);
  }

  function handleStatusChange(value: string) {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    const newStatus = value as PersonStatus | 'all';
    setStatus(newStatus);
    setPage(1);
    updateUrl(1, search, newStatus);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    updateUrl(newPage, search, status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRetry() {
    fetchPeople(page, search, status);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await peopleApi.remove(deleteTarget._id);
      showToast('Person deleted successfully.', 'success');
      setDeleteTarget(null);

      const newTotal = total - 1;
      const newTotalPages = Math.max(1, Math.ceil(newTotal / 20));

      if (page > newTotalPages) {
        const prevPage = newTotalPages;
        setPage(prevPage);
        updateUrl(prevPage, search, status);
      } else {
        fetchPeople(page, search, status);
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.status === 404) {
          showToast('Person not found.', 'error');
          setDeleteTarget(null);
          fetchPeople(page, search, status);
        } else if (err.status >= 500) {
          showToast('Unable to delete person. Please try again.', 'error');
        } else {
          showToast(err.message, 'error');
        }
      } else {
        showToast(
          'Unable to connect to the Bharat Knowledge API. Please check that the server is running and try again.',
          'error',
        );
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">People</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage knowledge profiles
          </p>
        </div>
        <Button asChild>
          <Link href="/people/new">
            <Plus className="h-4 w-4 mr-1" />
            Add Person
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search people..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-8"
            aria-label="Search people"
          />
        </div>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[160px]" aria-label="Filter by status">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
          <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
            Unable to load people.
          </p>
          <p className="text-xs text-red-600 dark:text-red-400 mb-4">
            Please check the API connection and try again.
          </p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Retry
          </Button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && <PeopleTableSkeleton />}

      {/* Empty states */}
      {!loading && !error && people.length === 0 && !hasFilters && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-1">
            No people found.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first knowledge profile to get started.
          </p>
          <Button asChild>
            <Link href="/people/new">
              <Plus className="h-4 w-4 mr-1" />
              Add Person
            </Link>
          </Button>
        </div>
      )}

      {!loading && !error && people.length === 0 && hasFilters && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground mb-1">
            No people match your current filters.
          </p>
          <p className="text-sm text-muted-foreground">
            Try changing your search or status filter.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && people.length > 0 && (
        <>
          <div className="text-sm text-muted-foreground">
            {total} {total === 1 ? 'person' : 'people'} found
          </div>
          <PeopleTable people={people} onDelete={setDeleteTarget} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Delete confirmation dialog */}
      <DeletePersonDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        personName={deleteTarget?.name || ''}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
