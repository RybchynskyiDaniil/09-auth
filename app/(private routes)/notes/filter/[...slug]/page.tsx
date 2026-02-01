import { fetchNotes } from "../../../../../lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "../../../../../types/note";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const targetTag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);
  return {
    title: targetTag ? `Notes: ${targetTag} ` : "All notes",
    description: `Your notes filtered by ${targetTag} category.`,
    openGraph: {
      title: targetTag ? `Notes: ${targetTag} ` : "All notes",
      description: `Your notes filtered by ${targetTag} category.`,
      url: "https://08-zustand-lyart-phi.vercel.app/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: "Notehub-Logo",
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const targetTag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { currentPage: 1, search: "", tag: targetTag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: targetTag,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={targetTag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
