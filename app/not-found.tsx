import css from "./page.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notehub-page-not-found",
  description:
    "Oops! The page you’re looking for doesn’t exist in NoteHub. Go back and continue organizing your notes.",
  openGraph: {
    title: "Notehub-page-not-found",
    description:
      "Oops! The page you’re looking for doesn’t exist in NoteHub. Go back and continue organizing your notes.",
    url: "https://08-zustand-lyart-phi.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub-Logo",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={"/"}>Go back home</Link>
    </div>
  );
};
export default NotFound;
