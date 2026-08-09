import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const shopLinks = [
  {
    name: "Catalogue",
    href: "/catalogue",
  },
  {
    name: "New Arrivals",
    href: "/catalogue?sort=newest",
  },
  {
    name: "Trending",
    href: "/catalogue?trending=true",
  },
  {
    name: "Collections",
    href: "/catalogue",
  },
];

const companyLinks = [
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#29205C] text-white">
      {/* =====================================
          MAIN FOOTER
      ====================================== */}

      <div className="mx-auto max-w-[1400px] px-7 py-16 sm:px-10 sm:py-20 lg:px-14 xl:px-16">
        {/* =====================================
            TOP FOOTER
        ====================================== */}

        <div className="grid gap-14 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr] lg:gap-20">
          {/* =================================
              BRAND
          ================================== */}

          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/lazuli-logo.png"
                alt="Lazuli"
                width={42}
                height={48}
                className="h-10 w-auto object-contain"
              />

              <div className="ml-3 leading-none">
                <span className="block font-serif text-[22px] tracking-[0.16em] text-white">
                  LAZULI
                </span>

                <span className="mt-1.5 block text-[6px] font-medium uppercase tracking-[0.38em] text-[#B8A0E4]">
                  Online Shop
                </span>
              </div>
            </Link>

            <p className="mt-7 max-w-[280px] font-serif text-sm leading-6 text-white/50">
              Carefully selected pieces inspired by the things you love.
            </p>

            {/* Instagram */}

            <a
              href="#"
              aria-label="Instagram"
              className="
                mt-7
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-white/15
                text-white/60
                transition-all duration-300
                hover:border-[#A981E8]
                hover:bg-[#A981E8]
                hover:text-white
              "
            >
              <FaInstagram size={14} />
            </a>
          </div>

          {/* =================================
              SHOP
          ================================== */}

          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#B8A0E4]">
              Shop
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {shopLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    w-fit
                    font-serif text-sm
                    text-white/65
                    transition-colors duration-200
                    hover:text-white
                  "
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================
              COMPANY
          ================================== */}

          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#B8A0E4]">
              Company
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    w-fit
                    font-serif text-sm
                    text-white/65
                    transition-colors duration-200
                    hover:text-white
                  "
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================
              CONTACT
          ================================== */}

          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#B8A0E4]">
              Get in touch
            </p>

            <div className="mt-6 space-y-5">
              {/* Email */}

              <a
                href="mailto:hello@lazuli.com.au"
                className="
                  group
                  flex items-start gap-3
                  text-sm
                  text-white/65
                  transition-colors
                  hover:text-white
                "
              >
                <Mail
                  size={15}
                  strokeWidth={1.3}
                  className="
                    mt-0.5
                    shrink-0
                    text-[#A981E8]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />

                <span>handmadelazuli@outlook.com</span>
              </a>

              {/* Location */}

              <div className="flex items-start gap-3 text-sm text-white/65">
                <MapPin
                  size={15}
                  strokeWidth={1.3}
                  className="mt-0.5 shrink-0 text-[#A981E8]"
                />

                <span>Australia, WA</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            DECORATIVE DIVIDER
        ====================================== */}

        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#A981E8]" />

          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* =====================================
            BOTTOM ROW
        ====================================== */}

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} Lazuli
          </p>

          <p className="font-serif text-xs italic text-white/35">
            Curated with care.
          </p>

          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
            Online Shop
          </p>
        </div>
      </div>
    </footer>
  );
}
