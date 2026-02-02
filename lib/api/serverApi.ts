import { cookies } from 'next/headers';
import { api } from './api';
import { FetchNotesData, NotesResponse,  } from "./clientApi"
import { Note } from '../../types/note';
import { User } from '../../types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};


export async function fetchNotesServer({
  page, search, tag
}: FetchNotesData): Promise<NotesResponse> {
  const cookieStore = await cookies();
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      search,
      tag
    },
     headers: {
      Cookie: cookieStore.toString(),
    }
  });

  return response.data;
}

export async function fetchNoteByIdServer(
  noteId: string
): Promise<Note> {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`,{headers: {
      Cookie: cookieStore.toString(),
    }});

  return response.data;
}


export const getMeServer = async () => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me',{headers: {
      Cookie: cookieStore.toString(),
    }});
  return data;
};

