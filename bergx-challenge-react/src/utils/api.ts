import axios, { AxiosInstance } from "axios";

export const httpApi: () => AxiosInstance = () => {
  const api = axios.create();

  api.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;

  api.defaults.headers.common["Content-Type"] =
    "application/json; charset=utf-8";

  // TODO Think about token.
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  return api;
};

type FormJsonReturnType = {
  [k: string]: FormDataEntryValue | number;
};

export function formJson<T extends FormJsonReturnType>(
  formElement: HTMLFormElement
): T {
  const data = new FormData(formElement);
  const value = Object.fromEntries(data.entries());

  // TODO value objesinin elemanlarının türünü FormDataEntryValue'dan string veya number'a çevir.

  return value as T;
}
