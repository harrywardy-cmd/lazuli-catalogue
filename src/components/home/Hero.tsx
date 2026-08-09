import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7F4]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#9B8BE8]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#35C7E8]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">

        {/* Hero Content */}
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#5C28AD]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C28AD]">
              Handmade with love
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#29205C] sm:text-6xl lg:text-7xl">
            Unique
            <span className="block text-[#5C28AD]">
              Accessories
            </span>
            <span className="block">
              Inspired by You
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-7 text-[#6E6A7D] sm:text-lg">
            Discover handmade accessories inspired by
            anime, games and everything beautiful.
            Explore the Lazuli collection and find
            something that feels uniquely yours.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-xl bg-[#5C28AD] px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4D2194] hover:shadow-lg hover:shadow-[#5C28AD]/20"
            >
              Browse Catalogue
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-[#DDD7E8] bg-white px-6 py-3.5 text-sm font-medium text-[#29205C] transition-all duration-200 hover:border-[#9B8BE8] hover:bg-[#F8F5FF]"
            >
              About Lazuli
            </Link>

          </div>

          {/* Small trust indicators */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#8A8697]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35B88A]" />
              Handmade
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35C7E8]" />
              Unique designs
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9B8BE8]" />
              Lazuli collection
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-lg">

          {/* Image background */}
          <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-[#E9E3FF] to-[#DDF8FC] rotate-3" />

          <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(81,74,120,0.14)]">

            {/* Replace this with an actual Square product image later */}
            <Image
              src="/images/hero-product.png"
              alt="Lazuli featured accessory"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 90vw, 500px"
            />

          </div>

          {/* Floating label */}
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-[#E6E1EE] bg-white px-4 py-3 shadow-lg sm:-left-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A8697]">
              Lazuli
            </p>

            <p className="mt-1 text-sm font-medium text-[#29205C]">
              Made with care
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}