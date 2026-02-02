import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api';
 
export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
});

export type ApiError = {
  message: string;
  status?: number;
  response?: {
    data?: {
      error?: string;
    };
  };
};