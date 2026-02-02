import NoteForm from "../../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CreateNote",
  description: "Here you can create your new note!",
  openGraph: {
    title: "CreateNote",
    description: "Here you can create your new note!",
    url: "https://08-zustand-lyart-phi.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub-Logo",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
