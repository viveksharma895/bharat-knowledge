import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const SKELETON_ROWS = 8;

export function PeopleTableSkeleton() {
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
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-4 w-36 rounded bg-muted animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-6 w-6 rounded bg-muted animate-pulse" />
                  <div className="h-6 w-6 rounded bg-muted animate-pulse" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
