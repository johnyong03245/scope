'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-100 py-6 mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} scopé. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <a href="https://www.termsfeed.com/live/3f004d2a-bfd0-4910-8ffd-83b8562ef278" className="text-gray-500 hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="https://www.termsfeed.com/live/cc830389-308d-4bdc-a7e5-36142cda629d" className="text-gray-500 hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}