'use client';

import { routes } from '@/lib/constants/routes';
import { getSlugFromTitle } from '@/lib/data/helpers';
import { Product } from '@/lib/types/product';
import { splitByQuery } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Suspense, use, useEffect, useState } from 'react';
import { LoadingSpinner } from '../loading/loading-spinner';
import { Button } from '../ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

export function SearchNavItem({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Focuses on search input with Ctrl+K keyboard shorcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          setOpen((open) => !open);
        }}
        variant="ghost"
        className="flex h-9 items-center gap-6 px-3 rounded-lg border text-muted-foreground font-normal cursor-text"
      >
        <div className="hidden md:flex gap-1 group/kbd">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
          <span>to search...</span>
        </div>
        <Search className="size-4 shrink-0 opacity-50" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <Suspense fallback={<LoadingSpinner text="Fetching products..." />}>
          <SearchResults productsPromise={productsPromise} query={query} />
        </Suspense>
      </CommandDialog>
    </>
  );
}

function SearchResults({
  productsPromise,
  query,
}: {
  productsPromise: Promise<Product[]>;
  query: string;
}) {
  const products = use(productsPromise);

  const matches = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  // Returns markup with matching part of result underlined
  const formatMatch = (match: string, query: string) => {
    const parts = splitByQuery(match, query);

    return (
      <span className="capitalize text-xs">
        {parts.before}
        <b className="underline font-medium">{parts.query}</b>
        {parts.after}
      </span>
    );
  };

  return (
    <CommandList>
      <CommandEmpty className="pl-4 py-2 text-sm italic">
        No results found
      </CommandEmpty>
      <CommandGroup heading={`Products (${matches.length})`}>
        {matches.map((match) => {
          const url = `${routes.products.href}/${getSlugFromTitle(match.title)}`;

          return (
            <CommandItem
              key={match.id}
              value={match.title}
              keywords={[match.title]}
              onSelect={() => {
                window.location.href = url;
              }}
              asChild
            >
              <a
                href={url}
                className="h-full w-full flex justify-between items-baseline cursor-pointer font-medium"
              >
                {formatMatch(match.title, query)}
                <span className="text-xs text-muted-foreground font-normal">
                  {match.category.name.toLowerCase()}
                </span>
              </a>
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  );
}

// Styled keyboard element
function Kbd({
  children,
  className = '',
  ...props
}: React.ComponentPropsWithoutRef<'kbd'>) {
  return (
    <kbd
      className={`inline-flex items-end border-1 rounded-sm bg-neutral-100 group-hover/kbd:bg-white px-1 text-xs ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}
