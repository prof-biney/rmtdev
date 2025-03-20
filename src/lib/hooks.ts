import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number | null): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const data = await res.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { isLoading, data } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => {
      try {
        const data = id ? fetchJobItem(id) : null;
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    jobItem: data?.jobItem,
    isLoading,
  } as const;
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      enabled: Boolean(id),
      refetchOnWindowFocus: false,
      retry: false,
    })),
  });

  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
}

// ---------------------------------------------

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const data = await res.json();
  return data;
};

export function useSearchQuery(searchText: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: async () => {
      try {
        const data = await fetchJobItems(searchText);
        console.log(data);
        return data;
      } catch (error: unknown) {
        handleError(error);
      }
    },
    staleTime: 1000 * 60 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(searchText),
  });

  return {
    jobItems: data?.jobItems,
    isLoading,
  } as const;
}

// ----------------------------------------------------

export function useActiveID() {
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveID(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeID;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export function useOnClickOutside(
  refs: React.RefObject<
    HTMLElement | HTMLButtonElement | HTMLDivElement | null
  >[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

// ---------------------------------------------------
export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("Component must be used within BookmarksContextProvider");
  }

  return context;
}
