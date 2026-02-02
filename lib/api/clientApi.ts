import { api } from "./api";
import { NoteTag , Note } from "../../types/note";
import { User } from "../../types/user";

export interface FetchNotesData{
page: number,
search: string,
tag?:NoteTag
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}


export async function fetchNotes(  {
  page, search, tag
}:FetchNotesData): Promise<NotesResponse> {
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      search,
      tag
    },
  });

  return response.data;
}

export async function createNote(
  newNote: NewNoteData
): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);

  return response.data;
}

export async function deleteNote(
  noteID: string
): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteID}`);

  return response.data;
}

export async function fetchNoteById(
  noteId: string
): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`);

  return response.data;
}

export interface AuthProps{
    email: string;
    password: string;

}



export const register = async (
  data:AuthProps
): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

export async function login (body:AuthProps) {
  const response = await api.post<User>(`/auth/login`, body);

  return response.data;
}

export async function logout ():Promise<void> {
 await api.post<User>(`/auth/logout`);
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const updateMe = async (body:AuthProps) => {
  const { data } = await api.patch<User>('/auth/me', body);
  return data;
};


