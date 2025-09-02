// src/components/Header.tsx
"use client"; 

import { useState } from 'react';

import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import { LocaleLink } from "./LocaleLink";
import { LogoData } from "@/lib/utils/types/types"; 

interface HeaderProps {
  logo: LogoData | null; 
  dictionary: {
    home: string;
    features: string;
    contact: string;
    company: string;
  };
}

const Header = ({ logo, dictionary }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Logo configuration
  const resolvedSrc = 'https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/freela%2Fid%20visual%20%20orion%20-%20logo%20varia%C3%A7%C3%A3o%2003.png?alt=media&token=b935408f-e43b-4c28-bc00-74572d7eb7e0';
  const resolvedAlt = "Orion Logo";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <LocaleLink href="/" className="flex items-center">
              <div className="relative w-[200px] h-[50px]">
                <img
                  src={resolvedSrc}
                  alt={resolvedAlt}
                  className="w-full h-full object-contain object-left"
                  onError={(e) => {
                    console.error('Failed to load logo:', resolvedSrc);
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/img/logo.png';
                  }}
                />
              </div>
            </LocaleLink>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LocaleLink href="/" className="text-gray-600 hover:text-[#3c4494]">{dictionary.home}</LocaleLink>
            <LocaleLink href="/features" className="text-gray-600 hover:text-[#3c4494]">{dictionary.features}</LocaleLink>
            <LocaleLink href="/company" className="text-gray-600 hover:text-[#3c4494]">{dictionary.company}</LocaleLink>
            <LocaleLink href="/contact" className="text-gray-600 hover:text-[#3c4494]">{dictionary.contact}</LocaleLink>
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#3c4494] focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <LocaleLink href="/" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.home}</LocaleLink>
            <LocaleLink href="/features" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.features}</LocaleLink>
            <LocaleLink href="/company" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.company}</LocaleLink>
            <LocaleLink href="/contact" className="text-gray-600 hover:text-[#3c4494] block px-3 py-2 rounded-md text-base font-medium">{dictionary.contact}</LocaleLink>
            <div className="mt-2">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;