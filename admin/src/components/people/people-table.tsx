'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './status-badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Person } from '@/types/people';

function formatDate(dateStr: string): string {
  if (!dateStr) return '\u2014';
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? '\u2014'
    : d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
}

interface PeopleTableProps {
  people: Person[];
  onDelete: (person: Person) => void;
}

export function PeopleTable({ people, onDelete }: PeopleTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Occupation</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person._id}>
              <TableCell className="font-medium">
                <Link
                  href={`/people/${person.slug}`}
                  className="hover:underline text-foreground"
                >
                  {person.name}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {person.occupations?.length
                  ? person.occupations.join(', ')
                  : '\u2014'}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {person.categories?.length
                  ? person.categories.map((c) => c.label || c.slug).join(' \u00b7 ')
                  : '\u2014'}
              </TableCell>
              <TableCell>
                <StatusBadge status={person.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(person.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/people/${person.slug}`}>
                      <Eye className="h-3.5 w-3.5" />
                      <span className="sr-only">View {person.name}</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/people/${person.slug}/edit`}>
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit {person.name}</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(person)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    <span className="sr-only">Delete {person.name}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
