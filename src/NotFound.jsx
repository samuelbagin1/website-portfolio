import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Seo from "./components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#FEFEFA]">
      <Seo
        title="Page not found | Samuel Bagin"
        description="The requested page could not be found."
        robots="noindex,nofollow,noarchive"
        canonical={false}
      />
      <Navbar />
      <main className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-center px-4 pb-20 pt-32 md:px-8">
        <p className="text-sm font-medium text-zinc-400">404</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-0.04em] md:text-7xl">Page not found</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
          This address does not point to a public portfolio page.
        </p>
        <Link
          to="/"
          className="mt-8 w-fit rounded-lg border border-zinc-600 px-5 py-3 font-semibold transition hover:border-zinc-300"
        >
          Return home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
