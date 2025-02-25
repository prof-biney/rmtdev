import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (id: number | null) => {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  const data = await res.json();
  return data;
};

export function useJobItem(id: number | null) {
  const { isLoading, data } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => fetchJobItem(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const jobItem = data.jobItem;
  return { jobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async function () {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalResults } as const;
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
