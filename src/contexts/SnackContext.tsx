import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from "react";

export type SnackContextData = {
  snacks: Snack[];

  getSnackById: (id: number) => Snack | null;
  getSnackByName: (name: string) => Snack | null;
  filterSnacksByName: (query: string) => Snack[];
  addSnack: (snack: Snack) => void;

  reviews: Review[];

  getReviewById: (id: number) => Review | null;
  getReviewsBySnackId: (snackId: number) => Review[];
  addReview: (review: Review) => void;
  updateReview: (id: number, content: string) => void;
  deleteReview: (id: number) => void;
};

function err(): never {
  throw new Error("context not found");
}

const SnackContext = createContext<SnackContextData>({
  snacks: [],
  getSnackById: err,
  getSnackByName: err,
  filterSnacksByName: err,
  addSnack: err,

  reviews: [],

  getReviewById: err,
  getReviewsBySnackId: err,
  addReview: err,
  updateReview: err,
  deleteReview: err,
});

const empty = true;

export function SnackProvider(p: { children: ReactNode }) {
  const [snacks, setSnacks] = useState<Snack[] | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const data = useMemo<SnackContextData>(
    () => ({
      snacks: snacks,
      getSnackById: (id) => snacks.find((s) => s.id === id) ?? null,
      getSnackByName: (name) => snacks.find((s) => s.name === name) ?? null,
      filterSnacksByName: (name) =>
        snacks.filter((s) => s.name.replace(/\s/g, '').includes(name.replace(/\s/g, ''))),
      addSnack: (snack) => setSnacks([...snacks, snack]),

      reviews: reviews,

      getReviewById: (id) => reviews.find((r) => r.id === id) ?? null,
      getReviewsBySnackId: (snackId) =>
        reviews.filter((r) => r.snackId === snackId),
      addReview: (review) => setReviews([review, ...reviews]),
      updateReview: (id, content) =>
        setReviews(reviews.map((r) => (r.id === id ? { ...r, content } : r))),
      deleteReview: (id) => setReviews(reviews.filter((r) => r.id !== id)),
    }),
    [snacks, reviews],
  );

  return (
    <SnackContext.Provider value={data}>{p.children}</SnackContext.Provider>
  );
}

export function useSnackContext() {
  return useContext(SnackContext);
}
