"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Catalogue", href: "/catalogue" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative border-b border-[#EEEAF3] bg-white">
      {/* =========================================
          DESKTOP HEADER
      ========================================== */}

      <div className="mx-auto flex h-[72px] items-center px-6 sm:px-8 lg:px-10">

        {/* =====================================
            LAZULI LOGO
        ====================================== */}

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center"
          aria-label="Lazuli Online Shop"
        >
          <div className="flex items-center gap-2">

            <Image
              src="/images/lazuli-logo.png"
              alt="Lazuli logo"
              width={34}
              height={42}
              priority
              className="h-9 w-auto object-contain"
            />

            <div className="leading-none">
              <span className="block font-serif text-[21px] tracking-[0.12em] text-[#29205C]">
                LAZULI
              </span>

              <span className="mt-1 block text-[6px] font-medium tracking-[0.35em] text-[#5C28AD]">
                ONLINE SHOP
              </span>
            </div>

          </div>
        </Link>

        {/* =====================================
            DESKTOP NAVIGATION
        ====================================== */}

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 text-[12px] font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-[#5C28AD]"
                    : "text-[#29205C] hover:text-[#5C28AD]"
                }`}
              >
                {item.name}

                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-px w-5 -translate-x-1/2 bg-[#5C28AD]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =====================================
            DESKTOP ACTIONS
        ====================================== */}

        <div className="ml-auto hidden items-center lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="text-[#29205C] transition-colors duration-200 hover:text-[#5C28AD]"
          >
            <Search
              size={20}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* =====================================
            MOBILE ACTIONS
        ====================================== */}

        <div className="ml-auto flex items-center gap-4 lg:hidden">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            <Search
              size={19}
              strokeWidth={1.5}
            />
          </button>

          {/* Menu */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            {menuOpen ? (
              <X
                size={21}
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                size={21}
                strokeWidth={1.5}
              />
            )}
          </button>

        </div>
      </div>

      {/* =========================================
          MOBILE NAVIGATION
      ========================================== */}

      {menuOpen && (
        <div className="border-t border-[#EEEAF3] bg-white lg:hidden">
          <nav className="px-6 py-5">
            <div className="flex flex-col">

              {navigation.map((item) => {
                const isActive =
                  pathname.startsWith(
                    item.href,
                  );

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`border-b border-[#F1EEF5] py-4 text-sm transition-colors last:border-0 ${
                      isActive
                        ? "font-medium text-[#5C28AD]"
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