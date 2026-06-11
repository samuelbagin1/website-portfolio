import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { FaDiscord, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Seo, { createWebPageSchema } from "./components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

const ContactShaderBackground = lazy(() => import("./components/ContactShaderBackground"));

const EMAIL_LINK = "mailto:samuel.bagin1@gmail.com?subject=Hello%20Samuel&body=Hi%20Samuel,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20with%20you.%0D%0A%0D%0ABest%20regards";
const CONTACT_DESCRIPTION = "Contact Samuel Bagin for AI engineering, data engineering, web development, and creative collaborations.";

const contactCards = [
  {
    title: "Instagram",
    value: "@samuelbagin",
    action: "View photography and recent work",
    href: "https://www.instagram.com/samuelbagin/",
    icon: FaInstagram,
  },
  {
    title: "Email",
    value: "samuel.bagin1@gmail.com",
    action: "Start a project conversation",
    href: EMAIL_LINK,
    icon: FaEnvelope,
  },
  {
    title: "LinkedIn",
    value: "Samuel Bagin",
    action: "Connect professionally",
    href: "https://www.linkedin.com/in/samuel-bag%C3%ADn/",
    icon: FaLinkedin,
  },
];

const glassCardClass = [
  "group h-full min-h-52 overflow-hidden rounded-2xl",
  "border border-white/25 bg-white/[0.11] text-white backdrop-blur-2xl",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_20px_rgba(0,0,0,0.08)]",
  "transition-[transform,background-color,border-color,box-shadow] duration-200",
  "ease-[cubic-bezier(0.23,1,0.32,1)]",
  "group-hover:-translate-y-1 group-hover:border-white/40 group-hover:bg-white/[0.16]",
  "group-active:scale-[0.98] group-active:translate-y-0",
  "motion-reduce:transition-none motion-reduce:group-hover:translate-y-0",
].join(" ");

function ContactCard({ title, value, action, href, icon: Icon }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      aria-label={`${action}: ${value}`}
    >
      <Card className={glassCardClass}>
        <CardHeader className="flex-row items-start justify-between space-y-0 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.12]">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">
            Open
          </span>
        </CardHeader>
        <CardContent className="flex h-[calc(100%-5.5rem)] flex-col justify-end p-6 pt-4">
          <CardTitle className="text-2xl font-semibold tracking-[-0.02em] text-white">
            {title}
          </CardTitle>
          <p className="mt-2 break-words text-sm font-medium text-white/90">{value}</p>
          <p className="mt-4 text-sm leading-6 text-white/65">{action}</p>
        </CardContent>
      </Card>
    </a>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef(null);
  const contactSchema = React.useMemo(
    () => createWebPageSchema({
      path: "/contact",
      name: "Contact Samuel Bagin",
      description: CONTACT_DESCRIPTION,
      type: "ContactPage",
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => window.clearTimeout(copiedTimerRef.current);
  }, []);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("apollo446");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "apollo446";
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopied(true);
    window.clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#160812] text-white">
      <Seo
        title="Contact Samuel Bagin | AI, Data & Web Development"
        description={CONTACT_DESCRIPTION}
        path="/contact"
        schema={contactSchema}
      />
      <div className="fixed inset-0 z-0 bg-[#160812]" aria-hidden="true">
        <Suspense fallback={null}>
          <ContactShaderBackground />
        </Suspense>
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <Navbar variant="glass" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <section className="max-w-xl">
            <p className="mb-5 text-sm font-medium text-white/70">Based in Slovakia, working worldwide.</p>
            <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Let&apos;s make something worth keeping.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-white/[0.72] sm:text-lg">
              Available for creative production and thoughtful collaborations.
              Choose the channel that works best for you.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.09] px-4 py-3 text-sm text-white/80 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.65)]" />
              Usually replies
            </div>
          </section>

          <section aria-label="Contact options" className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => <ContactCard key={card.title} {...card} />)}

            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="group rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
              aria-label="Copy Discord username apollo446"
            >
              <Card className={glassCardClass}>
                <CardHeader className="flex-row items-start justify-between space-y-0 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.12]">
                    <FaDiscord aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </CardHeader>
                <CardContent className="flex h-[calc(100%-5.5rem)] flex-col justify-end p-6 pt-4">
                  <CardTitle className="text-2xl font-semibold tracking-[-0.02em] text-white">
                    Discord
                  </CardTitle>
                  <p className="mt-2 text-sm font-medium text-white/90">apollo446</p>
                  <p className="mt-4 text-sm leading-6 text-white/65">
                    {copied ? "Username copied to clipboard." : "Copy username for a quick message."}
                  </p>
                </CardContent>
              </Card>
            </button>
          </section>
        </div>
      </main>

      <p className="sr-only" aria-live="polite">{copied ? "Discord username copied." : ""}</p>
    </div>
  );
}

export default Contact;
