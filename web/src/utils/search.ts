import { useCallback, useEffect, useRef, useState } from "react";
import { fetchV2 } from "./fetch";
import { SearchResponse } from "@dzcode.io/api/dist/search/types";

export const useSearch = (query: string, limit: number = 5) => {
  const [results, setResults] = useState<SearchResponse>();
  const queryRef = useRef("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(async () => {
    const searchResults = await fetchV2("api:Search", {
      query: [
        ["query", queryRef.current],
        ["limit", limit],
      ],
    });

    setResults(searchResults);
  }, [limit]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      queryRef.current = query;
      if (queryRef.current.length) search();
      else
        setResults({
          searchResults: {
            results: [],
          },
        });
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, search]);

  return results;
};
