"use client";
import NoteList from "../../../../../components/NoteList/NoteList";
import css from "./Notes.module.css";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../../../../../components/Pagination/Pagination";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { NoteTag } from "../../../../../types/note";
import Link from "next/link";

interface NotesClientProp {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProp) {
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [search, setSearch] = useState("");

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setPage(1);
  }, 1000);

  const handleSearch = (text: string) => {
    setSearch(text);
    debounced(text);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedQuery, tag],
    queryFn: () => fetchNotes({ page: page, search: debouncedQuery, tag: tag }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox value={search} onChange={handleSearch} />}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        {
          <Link className={css.button} href={`/notes/action/create`}>
            Create note +
          </Link>
        }
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {isSuccess && <NoteList notes={data.notes} />}
    </div>
  );
}
