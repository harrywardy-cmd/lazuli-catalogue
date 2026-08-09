"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capture the form before the async request.
    const formElement = event.currentTarget;

    setIsSending(true);
    setStatus(null);

    const form = new FormData(formElement);

    const name = form.get("name");
    const email = form.get("email");
    const subject = form.get("subject");
    const message = form.get("message");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      /*
       * The API returned an error.
       */
      if (!response.ok) {
        throw new Error(data?.error || "Failed to send email.");
      }

      /*
       * Email was successfully sent.
       */
      setStatus("success");

      /*
       * Reset the form using the captured
       * form element.
       */
      formElement.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      /*
       * Show the error message to the user.
       */
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  }
  return (
    <main className="bg-[#FAF9FB]">
      {/* =========================================
        CONTACT HERO
    ========================================== */}

      <section className="relative overflow-hidden border-b border-[#E9E3ED] bg-white">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#EEE5F7] blur-3xl opacity-70" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[350px] w-[550px] rounded-full bg-[#F5EFF9] blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28 xl:px-16">
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#6539B8]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.4em] text-[#6539B8]">
              Get in touch
            </p>
          </div>

          {/* Heading */}

          <h1 className="mt-7 max-w-[760px] font-serif text-[4rem] font-medium leading-[0.86] tracking-[-0.055em] text-[#29205C] sm:text-[5rem] lg:text-[6rem]">
            Let&apos;s
            <span className="block italic text-[#6B3DC2]">talk.</span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-[500px] font-serif text-sm leading-7 text-[#81778D] sm:text-base">
            Have a question about a piece, your order, or something else? Send
            us a message and we&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      {/* =========================================
        CONTACT CONTENT
    ========================================== */}

      <section className="bg-[#FAF9FB]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24 xl:px-16">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* =================================
              LEFT INFORMATION
          ================================== */}

            <div className="lg:pt-4">
              <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-[#6539B8]">
                Contact Lazuli
              </p>

              <h2 className="mt-4 font-serif text-3xl font-medium tracking-[-0.035em] text-[#29205C] sm:text-4xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-5 max-w-[370px] text-sm leading-7 text-[#81778D]">
                Whether you have a question about a product or simply want to
                get in touch, we&apos;re always happy to hear from you.
              </p>

              {/* Contact cards */}

              <div className="mt-9 space-y-3">
                {/* Email */}

                <a
                  href="mailto:handmadelazuli@outlook.com"
                  className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[#E7E1EB]
                  bg-white
                  px-5
                  py-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#D8C9E8]
                  hover:shadow-[0_10px_30px_rgba(41,32,92,0.06)]
                "
                >
                  <div
                    className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F0E9F7]
                  text-[#6539B8]
                  transition-colors
                  duration-300
                  group-hover:bg-[#6539B8]
                  group-hover:text-white
                "
                  >
                    <Mail size={15} strokeWidth={1.4} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#9A91A4]">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm text-[#29205C]">
                      handmadelazuli@outlook.com
                    </p>
                  </div>

                  <ArrowRight
                    size={13}
                    strokeWidth={1.3}
                    className="
                    ml-auto
                    shrink-0
                    text-[#B3AABC]
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-[#6539B8]
                  "
                  />
                </a>

                {/* Location */}

                <div
                  className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-[#E7E1EB]
                bg-white
                px-5
                py-4
              "
                >
                  <div
                    className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F0E9F7]
                  text-[#6539B8]
                "
                  >
                    <MapPin size={15} strokeWidth={1.4} />
                  </div>

                  <div>
                    <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#9A91A4]">
                      Location
                    </p>

                    <p className="mt-1 text-sm text-[#29205C]">Australia, WA</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}

              <div className="mt-10 border-t border-[#E5DFE9] pt-8">
                <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#9A91A4]">
                  Need a quick answer?
                </p>

                <p className="mt-2 max-w-[340px] text-sm leading-6 text-[#81778D]">
                  Take a look through our frequently asked questions before
                  getting in touch.
                </p>

                <Link
                  href="/faq"
                  className="
                  group
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#29205C]
                  transition-colors
                  hover:text-[#6539B8]
                "
                >
                  Visit FAQ
                  <ArrowRight
                    size={12}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* =================================
              CONTACT FORM
          ================================== */}

            <div
              className="
            rounded-[1.75rem]
            border
            border-[#E4DEE9]
            bg-white
            p-6
            shadow-[0_16px_50px_rgba(41,32,92,0.055)]
            sm:p-9
            lg:p-11
          "
            >
              {/* Form header */}

              <div className="mb-9">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#6539B8]" />

                  <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-[#6539B8]">
                    Send a message
                  </p>
                </div>

                <h2 className="mt-4 font-serif text-3xl font-medium tracking-[-0.035em] text-[#29205C] sm:text-4xl">
                  How can we help?
                </h2>

                <p className="mt-3 max-w-[420px] text-sm leading-6 text-[#81778D]">
                  Fill in the details below and your message will be sent
                  directly to Lazuli.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Name + Email */}

                <div className="grid gap-7 sm:grid-cols-2">
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#6F687B]"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="
                      mt-2
                      w-full
                      border-b
                      border-[#DCD5E2]
                      bg-transparent
                      px-0
                      py-3
                      text-sm
                      text-[#29205C]
                      outline-none
                      transition-colors
                      placeholder:text-[#AAA3B0]
                      focus:border-[#6539B8]
                    "
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#6F687B]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="
                      mt-2
                      w-full
                      border-b
                      border-[#DCD5E2]
                      bg-transparent
                      px-0
                      py-3
                      text-sm
                      text-[#29205C]
                      outline-none
                      transition-colors
                      placeholder:text-[#AAA3B0]
                      focus:border-[#6539B8]
                    "
                    />
                  </div>
                </div>

                {/* Subject */}

                <div>
                  <label
                    htmlFor="subject"
                    className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#6F687B]"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What can we help with?"
                    className="
                    mt-2
                    w-full
                    border-b
                    border-[#DCD5E2]
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    text-[#29205C]
                    outline-none
                    transition-colors
                    placeholder:text-[#AAA3B0]
                    focus:border-[#6539B8]
                  "
                  />
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#6F687B]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us a little more..."
                    className="
                    mt-2
                    w-full
                    resize-none
                    border-b
                    border-[#DCD5E2]
                    bg-transparent
                    px-0
                    py-3
                    text-sm
                    leading-6
                    text-[#29205C]
                    outline-none
                    transition-colors
                    placeholder:text-[#AAA3B0]
                    focus:border-[#6539B8]
                  "
                  />
                </div>

                {/* Status */}

                {status === "success" && (
                  <div
                    className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#CFE5D8]
                  bg-[#F3FAF6]
                  px-4
                  py-3.5
                "
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D8F0E1] text-[10px] text-[#3D8060]">
                      ✓
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#3D8060]">
                        Message sent successfully.
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-[#6D8D7C]">
                        Thanks for getting in touch. We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#E8D0D0]
                  bg-[#FFF7F7]
                  px-4
                  py-3.5
                "
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5DEDE] text-[10px] text-[#A05252]">
                      !
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#A05252]">
                        Message could not be sent.
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-[#9A7777]">
                        Please try again, or email us directly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit */}

                <div className="flex items-center justify-between gap-5 pt-1">
                  <p className="hidden text-[9px] leading-4 text-[#AAA3B0] sm:block">
                    We&apos;ll only use your email to reply to your message.
                  </p>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="
                    group
                    inline-flex
                    shrink-0
                    items-center
                    gap-3
                    rounded-full
                    bg-[#6539B8]
                    px-7
                    py-3.5
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-white
                    shadow-[0_8px_24px_rgba(101,57,184,0.16)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#5630A0]
                    hover:shadow-[0_12px_30px_rgba(101,57,184,0.22)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                  >
                    {isSending ? "Sending..." : "Send message"}

                    {!isSending && (
                      <ArrowRight
                        size={13}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </div>
              </form>
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
