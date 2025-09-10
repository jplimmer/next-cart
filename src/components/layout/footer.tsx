import { Button } from '@/components/ui/button';
import { ASSET_PATHS } from '@/lib/constants/assets';
import { routes } from '@/lib/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#004F44] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo */}
        <Link href={routes.home.href} className="flex items-center gap-2">
          <span className="font-bold">NextCart</span>
          <Image src={ASSET_PATHS.LOGOWHITE} alt="" width={32} height={32} />
        </Link>

        {/* Social Icons */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div
            className="flex justify-center space-x-4"
            style={{
              fontFamily: 'var(--iconsSocialMedia15Colr)',
              fontSize: '3.125rem',
            }}
          >
            <Link href="#">
              <span className="w-5 h-5">f</span>
            </Link>
            <Link href="#">
              <span className="w-5 h-5">t</span>
            </Link>
            <Link href="#">
              <span className="w-5 h-5">y</span>
            </Link>
            <Link href="#">
              <span className="w-5 h-5">r</span>
            </Link>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="text-right">
          <p className="mb-4">
            Receive the Latest News and Exclusive Offers by
          </p>
          <div className="flex justify-end space-x-2">
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
        <p>© 2025 NextCart - order like there´s no tomorrow</p>
        <div className="flex space-x-4">
          <Link href="#" className="underline">
            Terms of Use
          </Link>
          <Link href="#" className="underline">
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
