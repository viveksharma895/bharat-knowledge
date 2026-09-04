import { Badge } from '@/components/ui/badge';
import type { PersonStatus } from '@/types/people';

const statusConfig: Record<PersonStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  },
  review: {
    label: 'Review',
    className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  },
  published: {
    label: 'Published',
    className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  archived: {
    label: 'Archived',
    className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800',
  },
};

export function StatusBadge({ status }: { status: PersonStatus }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
