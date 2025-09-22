'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

type ModalProps = {
  children: React.ReactNode;
  title: string;
  showTitle: boolean;
  className?: string;
};

export default function Modal({ children, className, ...props }: ModalProps) {
  const router = useRouter();

  return (
    <Dialog
      open={true}
      onOpenChange={(open: boolean) => !open && router.back()}
    >
      <DialogContent className={`max-h-[90svh] overflow-y-auto ${className}`}>
        <DialogHeader>
          <DialogTitle className={props.showTitle ? '' : 'sr-only'}>
            {props.title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
