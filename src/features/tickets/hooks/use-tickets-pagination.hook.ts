import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function useTicketPagination() {
  const [page, setPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const nextPage = (totalPages?: number) => {
    if (totalPages && page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (!isNaN(pageNumber) && pageNumber >= 0) {
        setPage(pageNumber);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (page > 0) {
      setSearchParams({ page: page.toString() });
    } else {
      setSearchParams({});
    }
  }, [page]);

  return { page, nextPage, previousPage };
}