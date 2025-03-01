
import api from "@/services/api";
import useSWR from "swr";


export function useFetch<TData = unknown, TError = unknown>(
  url: string,
  token?: string
) {
  const { data, error, mutate } = useSWR<TData, TError>(
    url,
    async (requestUrl: string) => {
      const response = await api(token).get(requestUrl);
      return response.data;
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}