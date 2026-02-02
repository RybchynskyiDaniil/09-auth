"use client";
import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type NewNoteData } from "../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "../../lib/store/noteStore";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm() {
  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/all");
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newNote: NewNoteData) => createNote(newNote),
    onSuccess: () => {
      toast.success("Note is successfully uploaded");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title");
    const content = formData.get("content");
    const tag = formData.get("tag");

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof tag !== "string"
    ) {
      toast.error("Invalid form data");
      return;
    }

    mutation.mutate({
      title,
      content,
      tag: tag as NoteTag,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
