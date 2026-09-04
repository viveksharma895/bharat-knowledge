'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface DeletePersonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personName: string;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeletePersonDialog({
  open,
  onOpenChange,
  personName,
  onConfirm,
  isDeleting,
}: DeletePersonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={isDeleting ? undefined : onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Person?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{personName}</strong>?
            <br />
            <br />
            This action will permanently remove this person from the current
            knowledge database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? 'Deleting...' : 'Delete Person'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
