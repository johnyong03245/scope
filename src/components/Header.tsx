'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-gray-100 py-6 mb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/articles" className="flex items-center">
            <Image src="/scope.png" alt="scopé logo" width={80} height={80} />
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}