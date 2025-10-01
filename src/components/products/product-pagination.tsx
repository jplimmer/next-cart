'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { searchParamKeys } from '@/lib/constants/searchParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProductPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get(searchParamKeys.pageNumber)) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(searchParamKeys.pageNumber, pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem onClick={() => createPageURL(currentPage - 1)}>
            <PaginationPrevious />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, i) => {
          const isActive = currentPage === i + 1;

          return (
            <PaginationItem
              key={i}
              onClick={() => createPageURL(i + 1)}
              className={isActive ? 'underline' : ''}
            >
              <PaginationLink>{i + 1}</PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem onClick={() => createPageURL(currentPage + 1)}>
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
