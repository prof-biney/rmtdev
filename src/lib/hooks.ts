import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

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
        console.log(data);
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

export function useJobItems(searchText: string) {
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
