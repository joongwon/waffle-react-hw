import { useCallback, useEffect, useState } from "react";
import { Review, Snack } from "./types";
import { baseURL } from "./constants";

export function useReviewList(snackId?: number) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const url = snackId === undefined ? "/reviews" : `/reviews?snack=${snackId}`;
  const refetch = useCallback(async () => {
    const res = await fetch(baseURL + url);
    const data = await res.json();
    setReviews(data);
  }, [url]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { reviews, refetch };
}

export function useSnack(snackId: number) {
  const [snack, setSnack] = useState<Snack | null>(null);
  useEffect(() => {
    fetch(baseURL + `/snacks/${snackId}`)
      .then((res) => res.json())
      .then((data) => setSnack(data));
  }, [snackId]);
  return snack;
}

export function deleteReview(id: number, token: string) {
  return fetch(baseURL + "/reviews/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
