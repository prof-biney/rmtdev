import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async function () {
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setJobItem(data.jobItem);
      console.log(data.jobItem);
    };

    fetchData();
  }, [id]);

  return jobItem;
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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return [jobItemsSliced, isLoading] as const;
}
