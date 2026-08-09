import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Gem } from "lucide-react";

import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* =========================================
          HERO
      ========================================== */}

      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-16 lg:px-14 xl:px-16">
        <div
          className="
          relative
          overflow-hidden
          rounded-[1.5rem]
          border
          border-[#E6DFEA]
          bg-[#F6F2F8]
        "
        >
          {/* Background decoration */}

          <div
            className="
            pointer-events-none
            absolute
            -right-32
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#E5D7F1]/60
            blur-3xl
          "
          />

          <div
            className="
            pointer-events-none
            absolute
            -bottom-40
            left-1/3
            h-[350px]
            w-[500px]
            rounded-full
            bg-[#EEE5F4]/70
            blur-3xl
          "
          />

          <div
            className="
            relative
            z-10
            px-7
            py-16
            sm:px-12
            sm:py-20
            lg:px-16
            lg:py-24
            xl:px-20
          "
          >
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#6539B8]" />

              <p
                className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.38em]
                text-[#6539B8]
              "
              >
                About Lazuli
              </p>
            </div>

            {/* Heading */}

            <h1
              className="
              mt-6
              max-w-[750px]
              font-serif
              text-[3.5rem]
              font-medium
              leading-[0.9]
              tracking-[-0.05em]
              text-[#29205C]
              sm:text-[4.5rem]
              lg:text-[5.5rem]
            "
            >
              A little more
              <span
                className="
                block
                italic
                text-[#6B3DC2]
              "
              >
                about Lazuli.
              </span>
            </h1>

            {/* Introduction */}

            <p
              className="
              mt-7
              max-w-[560px]
              font-serif
              text-base
              leading-7
              text-[#70687A]
              sm:text-lg
            "
            >
              Lazuli is an online collection of carefully selected pieces
              inspired by individuality, creativity and the little things that
              make something feel uniquely yours.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          OUR STORY
      ========================================== */}

      <section
        className="
        mx-auto
        max-w-[1200px]
        px-6
        py-16
        sm:px-10
        sm:py-20
        lg:px-14
      "
      >
        <div
          className="
          grid
          items-center
          gap-12
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-20
        "
        >
          {/* Decorative image panel */}

          <div
            className="
            relative
            aspect-square
            overflow-hidden
            rounded-[1.5rem]
            bg-[#F4F0F6]
          "
          >
            <div
              className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
            >
              <div
                className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-[#EEE6F6]
              "
              >
                <Image
                  src="/images/lazuli-logo.png"
                  alt="Lazuli"
                  width={70}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>

            <div
              className="
              absolute
              bottom-6
              left-6
              right-6
              flex
              items-center
              justify-between
              border-t
              border-[#DDD4E4]
              pt-4
            "
            >
              <span
                className="
                text-[7px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-[#9A91A4]
              "
              >
                The Lazuli collection
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#6539B8]" />
            </div>
          </div>

          {/* Story */}

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#6539B8]" />

              <p
                className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-[#6539B8]
              "
              >
                Our story
              </p>
            </div>

            <h2
              className="
              mt-5
              font-serif
              text-3xl
              font-medium
              tracking-[-0.035em]
              text-[#29205C]
              sm:text-4xl
            "
            >
              Pieces with a
              <span className="italic text-[#6B3DC2]">
                {" "}
                little personality.
              </span>
            </h2>

            <div
              className="
              mt-6
              space-y-5
              text-sm
              leading-7
              text-[#81778D]
            "
            >
              <p>
                Lazuli was created around a simple idea: finding something you
                love should feel personal.
              </p>

              <p>
                Rather than trying to fill a catalogue with everything
                imaginable, we focus on bringing together pieces that catch the
                eye and feel worth keeping.
              </p>

              <p>
                From jewellery and charms to keychains and other small
                treasures, every piece has a place within the Lazuli collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHAT WE VALUE
      ========================================== */}

      <section
        className="
        border-y
        border-[#EAE4EE]
        bg-[#FAF9FB]
      "
      >
        <div
          className="
          mx-auto
          max-w-[1200px]
          px-6
          py-16
          sm:px-10
          sm:py-20
          lg:px-14
        "
        >
          {/* Section heading */}

          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#6539B8]" />

              <p
                className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-[#6539B8]
              "
              >
                What matters to us
              </p>
            </div>

            <h2
              className="
              mt-5
              font-serif
              text-3xl
              font-medium
              tracking-[-0.035em]
              text-[#29205C]
              sm:text-4xl
            "
            >
              Curated rather than crowded.
            </h2>
          </div>

          {/* Values */}

          <div
            className="
            mt-12
            grid
            gap-px
            overflow-hidden
            rounded-[1.25rem]
            border
            border-[#E5DFE9]
            bg-[#E5DFE9]
            sm:grid-cols-3
          "
          >
            {/* Value */}

            <div
              className="
              bg-white
              px-7
              py-9
            "
            >
              <Sparkles
                size={20}
                strokeWidth={1.3}
                className="text-[#6539B8]"
              />

              <h3
                className="
                mt-6
                font-serif
                text-xl
                font-medium
                text-[#29205C]
              "
              >
                Carefully selected
              </h3>

              <p
                className="
                mt-3
                text-xs
                leading-6
                text-[#81778D]
              "
              >
                We focus on pieces that feel distinctive, considered and worth
                discovering.
              </p>
            </div>

            {/* Value */}

            <div
              className="
              bg-white
              px-7
              py-9
            "
            >
              <Gem size={20} strokeWidth={1.3} className="text-[#6539B8]" />

              <h3
                className="
                mt-6
                font-serif
                text-xl
                font-medium
                text-[#29205C]
              "
              >
                Individual expression
              </h3>

              <p
                className="
                mt-3
                text-xs
                leading-6
                text-[#81778D]
              "
              >
                The collection is designed to give you small ways to make
                something feel like your own.
              </p>
            </div>

            {/* Value */}

            <div
              className="
              bg-white
              px-7
              py-9
            "
            >
              <Heart size={20} strokeWidth={1.3} className="text-[#6539B8]" />

              <h3
                className="
                mt-6
                font-serif
                text-xl
                font-medium
                text-[#29205C]
              "
              >
                Chosen with care
              </h3>

              <p
                className="
                mt-3
                text-xs
                leading-6
                text-[#81778D]
              "
              >
                From browsing to discovering your next favourite piece, we want
                the experience to feel thoughtful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COLLECTION
      ========================================== */}

      <section
        className="
        mx-auto
        max-w-[1200px]
        px-6
        py-16
        sm:px-10
        sm:py-20
        lg:px-14
      "
      >
        <div
          className="
          grid
          gap-10
          lg:grid-cols-[1fr_0.8fr]
          lg:items-end
        "
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#6539B8]" />

              <p
                className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-[#6539B8]
              "
              >
                The collection
              </p>
            </div>

            <h2
              className="
              mt-5
              font-serif
              text-3xl
              font-medium
              tracking-[-0.035em]
              text-[#29205C]
              sm:text-4xl
            "
            >
              Find something
              <span className="italic text-[#6B3DC2]">
                {" "}
                that feels like you.
              </span>
            </h2>
          </div>

          <div>
            <p
              className="
              text-sm
              leading-7
              text-[#81778D]
            "
            >
              Explore the Lazuli catalogue and discover jewellery, charms,
              keychains and other carefully selected pieces.
            </p>

            <Link
              href="/catalogue"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#6539B8]
                px-6
                py-3.5
                text-[9px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-white
                shadow-[0_10px_25px_rgba(101,57,184,0.15)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#5630A0]
              "
            >
              Explore catalogue
              <ArrowRight
                size={13}
                strokeWidth={1.4}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
        FOOTER
    ========================================== */}

      <Footer />
    </main>
  );
}
