"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import Footer from "@/components/layout/Footer";

type FAQ = {
  question: string;
  answer: string;
};

const faqSections = [
  {
    title: "Shopping",
    questions: [
      {
        question: "How do I browse the Lazuli collection?",
        answer:
          "You can explore the full Lazuli collection through our catalogue. Use the catalogue to browse products and select an item to view its details, price and availability.",
      },
      {
        question: "How can I find a specific product?",
        answer:
          "Browse the catalogue to explore the available products. Products are organised by category and may also be marked as trending or popular.",
      },
      {
        question: "Can I save products for later?",
        answer:
          "Yes. Select the heart icon on a product to add it to your favourites. Your saved products can then be viewed from the favourites menu.",
      },
    ],
  },
  {
    title: "Products",
    questions: [
      {
        question: "How do I know if a product is available?",
        answer:
          "Product availability is shown directly on each product card and product page. Products with available stock will show the current quantity, while unavailable products are marked as out of stock.",
      },
      {
        question: "Where can I find product information?",
        answer:
          "Select a product from the catalogue to view its individual product page. This includes the product image, description, price, category and current availability.",
      },
      {
        question: "Are Lazuli products unique?",
        answer:
          "Lazuli brings together a curated collection of jewellery, charms, keychains and other carefully selected pieces.",
      },
    ],
  },
  {
    title: "Orders & Support",
    questions: [
      {
        question: "How can I contact Lazuli?",
        answer:
          "You can contact Lazuli through our contact page. Send us a message with your question and we'll get back to you as soon as we can.",
      },
      {
        question: "I have a question about a product. What should I do?",
        answer:
          "If you have a question about a particular piece, open its product page first. If you still need help, contact Lazuli and include the product name in your message.",
      },
      {
        question: "Where is Lazuli based?",
        answer:
          "Lazuli is an Australian online shop.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E8E2EB]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={`font-serif text-base leading-6 transition-colors duration-200 sm:text-lg ${
            isOpen
              ? "text-[#6539B8]"
              : "text-[#29205C]"
          }`}
        >
          {question}
        </span>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-[#6539B8] bg-[#6539B8] text-white"
              : "border-[#DCD5E3] bg-white text-[#6539B8]"
          }`}
        >
          <Plus
            size={13}
            strokeWidth={1.4}
          />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[700px] pb-6 pr-12 text-sm leading-7 text-[#81778D]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] =
    useState<string | null>(null);

  function toggleQuestion(question: string) {
    setOpenQuestion((current) =>
      current === question ? null : question,
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FB]">

      {/* =========================================
          HERO
      ========================================== */}

      <section className="border-b border-[#E8E2EB] bg-white">

        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16">

          {/* Eyebrow */}

          <div className="flex items-center gap-3">

            <span className="h-px w-7 bg-[#6539B8]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.38em] text-[#6539B8]">
              Help & information
            </p>

          </div>

          {/* Heading */}

          <h1 className="mt-6 max-w-[700px] font-serif text-[3.5rem] font-medium leading-[0.9] tracking-[-0.05em] text-[#29205C] sm:text-[4.5rem] lg:text-[5rem]">
            Frequently
            <span className="block italic text-[#6B3DC2]">
              asked.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-7 max-w-[520px] font-serif text-sm leading-7 text-[#81778D]">
            Find answers to some of the most common
            questions about Lazuli, our products and
            getting in touch with us.
          </p>

        </div>

      </section>


      {/* =========================================
          FAQ CONTENT
      ========================================== */}

      <section>

        <div className="mx-auto max-w-[1000px] px-6 py-14 sm:px-10 sm:py-18 lg:py-24">

          <div className="space-y-14">

            {faqSections.map((section) => (
              <div key={section.title}>

                {/* Section heading */}

                <div className="mb-4 flex items-center gap-3">

                  <span className="h-px w-5 bg-[#D5CCDE]" />

                  <h2 className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#6539B8]">
                    {section.title}
                  </h2>

                </div>

                {/* Questions */}

                <div className="border-t border-[#E8E2EB]">

                  {section.questions.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={
                        openQuestion === faq.question
                      }
                      onToggle={() =>
                        toggleQuestion(
                          faq.question,
                        )
                      }
                    />
                  ))}

                </div>

              </div>
            ))}

          </div>


          {/* =====================================
              CONTACT CTA
          ====================================== */}

          <div className="mt-20 overflow-hidden rounded-[1.5rem] border border-[#E3DCE8] bg-white">

            <div className="relative px-7 py-10 sm:px-10 sm:py-12">

              {/* Decorative glow */}

              <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#E9DDF5] opacity-60 blur-3xl" />

              <div className="relative">

                <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#6539B8]">
                  Still need help?
                </p>

                <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.03em] text-[#29205C]">
                  We&apos;re happy to help.
                </h2>

                <p className="mt-3 max-w-[500px] text-sm leading-6 text-[#81778D]">
                  If you couldn&apos;t find what you were
                  looking for, send us a message and we&apos;ll
                  get back to you.
                </p>

                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#6539B8] px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(101,57,184,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5630A0]"
                >
                  Contact Lazuli

                  <ArrowRight
                    size={13}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

              </div>

            </div>

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