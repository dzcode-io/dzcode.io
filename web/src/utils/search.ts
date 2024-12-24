import { useCallback, useEffect, useRef, useState } from "react";
import { fetchV2 } from "./fetch";
import { SearchResponse } from "@dzcode.io/api/dist/search/types";

export const useSearch = (query: string, limit: number = 5) => {
  const [results, setResults] = useState<SearchResponse["searchResults"]["results"]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const queryRef = useRef("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async () => {
    setIsFetching(true);
    const searchResults = await fetchV2("api:Search", {
      query: [
        ["query", queryRef.current],
        ["limit", limit],
      ],
    });

    setResults(searchResults.searchResults.results);
    setIsFetching(false);
  }, [limit]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsFetching(true);
    timeoutRef.current = setTimeout(() => {
      queryRef.current = query;
      if (queryRef.current.length) search();
      else {
        setResults([]);
        setIsFetching(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, search]);

  return { results, isFetching };
};
