import type { ApiProduct } from "./types";

const API_URL = "https://growtask.ru/test-front/api/products";
const PROXY_URL = "/api/products";

const isAbortError = (error: unknown): boolean => {
  return error instanceof DOMException && error.name === "AbortError";
};

const requestProducts = async (url: string, signal?: AbortSignal): Promise<ApiProduct[]> => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Не удалось загрузить товары: ${response.status}`);
  }

  const payload = (await response.json()) as { data: ApiProduct[] };

  return payload.data;
};

export const fetchProducts = async (signal?: AbortSignal): Promise<ApiProduct[]> => {
  try {
    return await requestProducts(API_URL, signal);
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    return requestProducts(PROXY_URL, signal);
  }
};
