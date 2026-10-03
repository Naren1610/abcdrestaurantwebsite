import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isDeleting?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmDeleteDialog({
  open = false,
  onOpenChange,
  title,
  description,
  onConfirm,
  isDeleting = false,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm" className="max-w-xs sm:max-w-sm p-5 sm:p-6 rounded-2xl">
        <AlertDialogHeader className="place-items-center text-center gap-1.5">
          <AlertDialogTitle className="font-outfit text-base sm:text-lg text-foreground font-semibold tracking-tight text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-outfit text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-3 grid grid-cols-2 bg-transparent border-none p-0 m-0">
          <AlertDialogCancel
            variant="outline"
            disabled={isDeleting}
            className="font-outfit font-medium text-sm h-9 rounded-lg"
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="font-outfit font-medium text-sm h-9 rounded-lg"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
