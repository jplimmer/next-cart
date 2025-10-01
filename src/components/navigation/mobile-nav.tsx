'use client';

import { routes } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use, useEffect } from 'react';
import { NavPageItem, NavProductCategory } from '../../lib/data/pages-nav-data';
import { Logo } from '../layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  Sidebar,
  SidebarCloseButton,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';

interface MobileNavProps {
  pages: NavPageItem[];
}

export function MobileNav({ pages }: MobileNavProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Close sidebar on navigation (pathname change)
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link href={routes.home.href} className="flex items-center gap-2">
            <span className="font-bold">NextCart</span>
            <Logo size={32} />
          </Link>
          <SidebarCloseButton />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Accordion type="single" collapsible>
            {pages.map((page) =>
              page.items ? (
                <AccordionItem key={page.title} value={page.title}>
                  <AccordionTrigger>{page.title}</AccordionTrigger>
                  <AccordionContent>
                    <CategoriesList categoriesPromise={page.items} />
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SidebarMenuItem
                  key={page.title}
                  className={cn(
                    'focus-visible:border-ring focus-visible:ring-ring/50 rounded-md py-4 text-left text-sm font-medium outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
                    'border-b last_border-b-0'
                  )}
                >
                  <Link href={page.href}>{page.title}</Link>
                </SidebarMenuItem>
              )
            )}
          </Accordion>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

// Categories accordion content
function CategoriesList({
  categoriesPromise,
}: {
  categoriesPromise: Promise<NavProductCategory[]>;
}) {
  const categories = use(categoriesPromise);

  return (
    <AccordionContent>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link href={cat.href} className="hover:underline">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </AccordionContent>
  );
}
