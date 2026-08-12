"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FavouritesMenu from "@/components/favourites/FavouritesMenu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalogue", href: "/catalogue" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const pathname = usePathname();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-50 border-b border-[#EEEAF3] bg-white">

      {/* =========================================
          HEADER
      ========================================== */}

      <div className="mx-auto flex h-[72px] items-center px-6 sm:px-8 lg:px-10">

        {/* =====================================
            LOGO
        ====================================== */}

        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center"
          aria-label="Lazuli Online Shop"
        >
          <div className="flex items-center gap-2">

            <Image
              src="/images/lazuli-logo.png"
              alt="Lazuli logo"
              width={34}
              height={42}
              priority
              className="
                h-9
                w-auto
                object-contain
                transition-transform
                duration-300
                group-hover:scale-[1.03]
              "
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
            const isHome =
              item.href === "/" &&
              pathname === "/";

            const isActive =
              item.href === "/"
                ? isHome
                : pathname.startsWith(
                    item.href,
                  );

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group
                  relative
                  py-2
                  text-[12px]
                  font-medium
                  tracking-wide
                  transition-colors
                  duration-300
                  ${
                    isActive
                      ? "text-[#5C28AD]"
                      : "text-[#29205C] hover:text-[#5C28AD]"
                  }
                `}
              >
                {item.name}

                {/* Animated underline */}

                <span
                  className={`
                    absolute
                    -bottom-1
                    left-1/2
                    h-px
                    -translate-x-1/2
                    bg-[#5C28AD]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "w-5 opacity-100"
                        : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                    }
                  `}
                />
              </Link>
            );
          })}

        </nav>

        {/* =====================================
            DESKTOP FAVOURITES
        ====================================== */}

        <div className="ml-auto hidden lg:block">
          <FavouritesMenu />
        </div>

        {/* =====================================
            MOBILE ACTIONS
        ====================================== */}

        <div className="ml-auto flex items-center gap-3 lg:hidden">

          <FavouritesMenu mobile />

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
            className="
              text-[#29205C]
              transition-colors
              duration-300
              hover:text-[#5C28AD]
            "
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

      <div
        className={`
          overflow-hidden
          border-t
          border-[#EEEAF3]
          bg-white
          transition-all
          duration-300
          ease-out
          lg:hidden
          ${
            menuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }
        `}
      >

        <nav className="px-6 py-5">

          <div className="flex flex-col">

            {navigation.map((item, index) => {
              const isHome =
                item.href === "/" &&
                pathname === "/";

              const isActive =
                item.href === "/"
                  ? isHome
                  : pathname.startsWith(
                      item.href,
                    );

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 35}ms`
                      : "0ms",
                  }}
                  className={`
                    border-b
                    border-[#F1EEF5]
                    py-4
                    text-sm
                    transition-all
                    duration-300
                    last:border-0
                    ${
                      menuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }
                    ${
                      isActive
                        ? "font-medium text-[#5C28AD]"
                        : "text-[#29205C] hover:text-[#5C28AD]"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}

          </div>

        </nav>

      </div>

    </header>
  );
}