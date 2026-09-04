'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Eye, Archive } from 'lucide-react';
import { peopleApi } from '@/lib/api/people';


function StatCard({
  title,
  count,
  icon: Icon,
  href,
}: {
  title: string;
  count: number | null;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition-colors hover:bg-muted/50 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {count !== null ? count : '\u2014'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const [counts, setCounts] = useState<{
    total: number | null;
    draft: number | null;
    review: number | null;
    published: number | null;
  }>({
    total: null,
    draft: null,
    review: null,
    published: null,
  });

  useEffect(() => {
    async function load() {
      try {
        const [allRes, draftRes, reviewRes, publishedRes] = await Promise.all([
          peopleApi.list({ limit: 1 }),
          peopleApi.list({ status: 'draft', limit: 1 }),
          peopleApi.list({ status: 'review', limit: 1 }),
          peopleApi.list({ status: 'published', limit: 1 }),
        ]);
        setCounts({
          total: allRes.pagination.total,
          draft: draftRes.pagination.total,
          review: reviewRes.pagination.total,
          published: publishedRes.pagination.total,
        });
      } catch {
        setCounts({ total: null, draft: null, review: null, published: null });
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your knowledge base
          </p>
        </div>
        <Button asChild>
          <Link href="/people/new">+ Add Person</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="People" count={counts.total} icon={Users} href="/people" />
        <StatCard title="Draft" count={counts.draft} icon={FileText} href="/people?status=draft" />
        <StatCard title="Review" count={counts.review} icon={Eye} href="/people?status=review" />
        <StatCard title="Published" count={counts.published} icon={Archive} href="/people?status=published" />
      </div>
    </div>
  );
}
