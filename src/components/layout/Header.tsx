"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#EEEAF3] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo + Company Name */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          {/* Logo Image */}
          <Image
            src="/images/lazuli-logo.png"
            alt="Lazuli logo"
            width={45}
            height={55}
            priority
            className="h-12 w-auto object-contain"
          />

          {/* Company Name */}
          <div className="leading-none">
            <span className="block font-serif text-2xl tracking-[0.18em] text-[#29205C]">
              LAZULI
            </span>

            <span className="mt-1 block text-[8px] font-medium tracking-[0.35em] text-[#5C28AD]">
              ONLINE SHOP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-7 text-sm font-medium text-[#29205C] transition-colors hover:text-[#5C28AD]"
              >
                {item.name}

                {/* Active Page Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#5C28AD]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            <Search size={21} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            aria-label="Favourites"
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            <Heart size={21} strokeWidth={1.6} />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Search"
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            <Search size={20} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.7} />
            ) : (
              <Menu size={22} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#EEEAF3] bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
            <div className="flex flex-col">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`border-b border-[#F0EDF5] py-4 text-sm font-medium transition-colors last:border-b-0 ${
                      isActive
                        ? "text-[#5C28AD]"
                        : "text-[#29205C] hover:text-[#5C28AD]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}