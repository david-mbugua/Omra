"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface FooterWithGridProps {
  onLogoClick?: () => void;
}

export function FooterWithGrid({ onLogoClick }: FooterWithGridProps) {
  return (
    <div className="bg-[#2C2C3A]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="border-b border-[#4A4A68] pb-8">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" onLogoClick={onLogoClick} />
            <p className="mb-4 text-sm text-white">
              Omra helps you create and manage your digital legacy with ease. 
              Secure your important documents, protect your assets, and ensure 
              your loved ones are taken care of.
            </p>
            <div className="text-sm text-white">
              Building the future of digital estate planning
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-10 border-b border-[#4A4A68] pb-10 pt-10 md:grid-cols-4">
          <ul className="text-base font-medium text-white">
            <li className="mb-4 text-sm font-bold text-white">
              Product
            </li>
            {PRODUCT_LINKS.map((item, idx) => (
              <li key={"product" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-white hover:text-[#FF6B57] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <ul className="text-base font-medium text-white">
            <li className="mb-4 text-sm font-bold text-white">
              Resources
            </li>
            {RESOURCES_LINKS.map((item, idx) => (
              <li key={"resources" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-white hover:text-[#FF6B57] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <ul className="text-base font-medium text-white">
            <li className="mb-4 text-sm font-bold text-white">
              Company
            </li>
            {COMPANY_LINKS.map((item, idx) => (
              <li key={"company" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-white hover:text-[#FF6B57] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          <ul className="text-base font-medium text-white">
            <li className="mb-4 text-sm font-bold text-white">
              Legal
            </li>
            {LEGAL_LINKS.map((item, idx) => (
              <li key={"legal" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-white hover:text-[#FF6B57] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between pt-10 md:flex-row">
          <p className="mb-4 text-sm text-white md:mb-0">
            &copy; {new Date().getFullYear()} Omra. All Rights Reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="#" className="text-white hover:text-[#FF6B57] transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#FF6B57] transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#FF6B57] transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-white hover:text-[#FF6B57] transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_LINKS = [
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Security", href: "/security" },
  { title: "Smart Will", href: "/smart-will" },
  { title: "Integrations", href: "/integrations" },
];

const RESOURCES_LINKS = [
  { title: "Help Center", href: "/help" },
  { title: "Documentation", href: "/docs" },
  { title: "Blog", href: "/blog" },
  { title: "Webinars", href: "/webinars" },
  { title: "Templates", href: "/templates" },
];

const COMPANY_LINKS = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Press", href: "/press" },
  { title: "Partners", href: "/partners" },
  { title: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
  { title: "Cookie Policy", href: "/cookies" },
  { title: "Compliance", href: "/compliance" },
  { title: "Trust Center", href: "/trust" },
];

interface LogoProps {
  className?: string;
  onLogoClick?: () => void;
}

const Logo = ({ className, onLogoClick }: LogoProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex flex-shrink-0 items-center justify-center space-x-2 py-6 text-center text-2xl font-bold text-white selection:bg-[#FF6B57] cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-[#FF6B57] bg-[#FF6B57] text-sm text-white antialiased md:h-6 md:w-6">
        <div className="absolute inset-x-0 -top-10 h-10 w-full rounded-full bg-white/[0.2] blur-xl" />
        <div className="relative z-20 text-sm font-bold">
          O
        </div>
      </div>
      <div className="flex items-center gap-2 font-[var(--font-inter)] text-xl text-white">
        Omra
      </div>
    </button>
  );
};