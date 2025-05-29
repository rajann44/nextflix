'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer role="contentinfo" className="bg-black text-gray-400 py-12">
      <div className="max-w-[980px] mx-auto px-4 md:px-8">
        <div className="flex space-x-6 mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-[850px]">
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:text-white">Audio Description</Link>
            <Link href="#" className="block text-sm hover:text-white">Investor Relations</Link>
            <Link href="#" className="block text-sm hover:text-white">Legal Notices</Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:text-white">Help Center</Link>
            <Link href="#" className="block text-sm hover:text-white">Jobs</Link>
            <Link href="#" className="block text-sm hover:text-white">Cookie Preferences</Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:text-white">Gift Cards</Link>
            <Link href="#" className="block text-sm hover:text-white">Terms of Use</Link>
            <Link href="#" className="block text-sm hover:text-white">Corporate Information</Link>
          </div>
          <div className="space-y-3">
            <Link href="#" className="block text-sm hover:text-white">Media Center</Link>
            <Link href="#" className="block text-sm hover:text-white">Privacy</Link>
            <Link href="#" className="block text-sm hover:text-white">Contact Us</Link>
          </div>
        </div>

        <div className="mt-8 mb-4">
          <button className="border border-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white">
            Service Code
          </button>
        </div>

        <div className="text-xs text-gray-400">
          <p>© 1997-{new Date().getFullYear()} Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 