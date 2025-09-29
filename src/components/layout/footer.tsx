import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { Logo } from './logo';

export default function Footer() {
  return (
    <footer className="full-width bg-[#004F44] text-white py-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start px-4">
        {/* Logo */}
        <Link
          href={routes.home.href}
          className="flex items-center justify-center md:justify-start gap-2"
        >
          <span className="font-bold">NextCart</span>
          <Logo size={32} colour="white" />
        </Link>

        {/* Social Icons */}
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Follow Us</p>
          <div
            className="flex justify-center space-x-4"
            style={{
              fontFamily: 'var(--iconsSocialMedia15Colr)',
              fontSize: '3.125rem',
            }}
          >
            <Link href="https://www.facebook.com/">
              <span className="w-5 h-5">f</span>
            </Link>
            <Link href="https://twitter.com/">
              <span className="w-5 h-5">t</span>
            </Link>
            <Link href="https://www.youtube.com/">
              <span className="w-5 h-5">y</span>
            </Link>
            <Link href="https://rss.com/">
              <span className="w-5 h-5">r</span>
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="text-center md:text-right">
          <p className="mb-4">
            Receive the Latest News and Exclusive Offers by
          </p>
          <div className="flex justify-center md:justify-end space-x-2">
            <Button variant="outline" className="bg-white text-[#004F44]">
              TEXT
            </Button>
            <Button variant="outline" className="bg-white text-[#004F44]">
              EMAIL
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white my-6"></div>

      {/* Bottom Section */}
      <div className="grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4 items-center text-sm px-4">
        <p className="text-center md:text-left">
          © 2025 NextCart - order like there´s no tomorrow
        </p>
        <div className="flex justify-center space-x-4">
          <Link href={routes.about.href} className="underline">
            Terms of Use
          </Link>
          <Link href={routes.contact.href} className="underline">
            Privacy Policy
          </Link>
        </div>
        <div className="text-center md:text-right">
          <p>777 Casino Ave. Thackerville, OK 73459</p>
          <p>1-800-622-6317</p>
        </div>
      </div>
    </footer>
  );
}
