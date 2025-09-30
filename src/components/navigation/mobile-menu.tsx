'use client';

import { routes } from '@/lib/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
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

export function MobileMenu() {
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
            {/* Products */}
            <AccordionItem value="products">
              <AccordionTrigger>{routes.products.title}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    <Link href="#">All Products</Link>
                  </li>
                  <li>
                    <Link href="#">Clothes</Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            {/* About */}
            <SidebarAccItem>
              <Link href={routes.about.href}>{routes.about.title}</Link>
            </SidebarAccItem>
            {/* Contact */}
            <SidebarAccItem>
              <Link href={routes.contact.href}>{routes.contact.title}</Link>
            </SidebarAccItem>
          </Accordion>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

// SidebarMenuItem with Accordion styling
function SidebarAccItem({ children }: { children: React.ReactNode }) {
  return (
    <SidebarMenuItem
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 rounded-md py-4 text-left text-sm font-medium outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
        'border-b last_border-b-0'
      )}
    >
      {children}
    </SidebarMenuItem>
  );
}
