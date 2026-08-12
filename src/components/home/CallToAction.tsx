import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* =========================================
            CTA PANEL
        ========================================== */}

        <div className="group relative overflow-hidden rounded-[2rem] border border-[#E5DFE9] bg-[#29205C] px-6 py-16 shadow-[0_20px_60px_rgba(41,32,92,0.10)] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* =====================================
              BACKGROUND DETAILS
          ====================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Main purple gradient */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(107,61,194,0.32),transparent_38%),radial-gradient(circle_at_15%_90%,rgba(101,57,184,0.22),transparent_35%)]" />

            {/* Soft centre glow */}

            <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B6BD1]/10 blur-[120px]" />

            {/* Decorative ring */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/[0.06] sm:-right-24 sm:-top-24 sm:h-80 sm:w-80" />

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/[0.04] sm:-right-12 sm:-top-12 sm:h-56 sm:w-56" />

            {/* Small decorative dot */}

            <div className="absolute bottom-10 left-10 h-1.5 w-1.5 rounded-full bg-[#C9B7E9]/40" />

            <div className="absolute bottom-16 left-16 h-1 w-1 rounded-full bg-[#C9B7E9]/20" />
          </div>

          {/* =====================================
              CONTENT
          ====================================== */}

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Eyebrow */}

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#A98BE0]/60" />

              <p className="text-[8px] font-medium uppercase tracking-[0.4em] text-[#C9B9E8]">
                The Lazuli Collection
              </p>

              <span className="h-px w-8 bg-[#A98BE0]/60" />
            </div>

            {/* Icon */}

            <div
              className="
    relative
    mx-auto
    mt-8
    h-12
    w-12
    overflow-hidden
    rounded-full
    border
    border-white/10
    bg-white/[0.06]
    transition-all
    duration-500
    group-hover:scale-105
    group-hover:border-white/20
  "
            >
              <Image
                src="/images/2Lazuli_Circle3.png"
                alt="Lazuli"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            {/* Heading */}

            <h2
              className="
                mt-7
                font-serif
                text-[2.5rem]
                font-medium
                leading-[0.95]
                tracking-[-0.05em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Find your next
              <span className="mt-1 block italic text-[#C9B7E9]">
                favourite piece.
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-xl font-serif text-sm leading-7 text-[#C7BFDA] sm:text-base">
              Explore carefully selected pieces, unique designs, and collections
              inspired by the things you love.
            </p>

            {/* =====================================
                ACTIONS
            ====================================== */}

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Catalogue */}

              <Link
                href="/catalogue"
                className="
                  group/button
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-7
                  py-3.5
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#29205C]
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#F8F5FC]
                  hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)]
                "
              >
                Explore catalogue
                <ArrowRight
                  size={13}
                  strokeWidth={1.4}
                  className="
                    transition-transform
                    duration-300
                    group-hover/button:translate-x-1
                  "
                />
              </Link>

              {/* Contact */}

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-white/20
                  px-7
                  py-3.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-white/40
                  hover:bg-white/[0.06]
                "
              >
                Contact Lazuli
              </Link>
            </div>

            {/* Supporting text */}

            <div className="mt-8 flex items-center justify-center gap-3 text-[7px] uppercase tracking-[0.3em] text-white/30">
              <span>Curated with care</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>The Lazuli Collection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
