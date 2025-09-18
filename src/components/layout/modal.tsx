'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

type ModalProps =
  | {
      children: React.ReactNode;
      title: string;
      description: string;
      className?: string;
    }
  | {
      children: React.ReactNode;
      titleId: string;
      descriptionId: string;
      className?: string;
    };

export default function Modal({ children, className, ...props }: ModalProps) {
  const router = useRouter();

  if ('title' in props) {
    return (
      <Dialog
        open={true}
        onOpenChange={(open: boolean) => !open && router.back()}
      >
        <DialogContent className={`max-h-[90svh] overflow-y-auto ${className}`}>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => !open && router.back()}
    >
      <DialogContent
        className={`max-h-[90svh] overflow-y-auto ${className}`}
        aria-labelledby={props.titleId}
        aria-describedby={props.descriptionId}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
