import React, {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useContext,
} from "react";
export type Snack = {
  id: number;
  name: string;
  image: string;
};

export type Review = {
  id: number;
  snackId: number;
  rating: number;
  content: string;
};

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

export function SnackProvider(p: { children: ReactNode }) {
  const [snacks, setSnacks] = useState<Snack[]>([
  {
    "id": 1698852393397,
    "name": "먹태깡",
    "image": "https://dimg.donga.com/wps/NEWS/IMAGE/2023/07/05/120093215.1.edit.jpg"
  },
  {
    "id": 1698852436643,
    "name": "오!감자",
    "image": "https://www.thinkfood.co.kr/news/photo/article/10773632984ef2ae2fb79f817.jpg"
  },
  {
    "id": 1698852457527,
    "name": "자갈치",
    "image": "https://i.namu.wiki/i/jx2uYcM_jZLrYWc1HiBAyDopYdBUcrD8fKPo2iKWdO9zFMIL-wyooAb3zwIMOtJ9yUT-3_W-VP5ytA5ZgbF3Dg.webp"
  },
  {
    "id": 1698852495006,
    "name": "감자깡",
    "image": "https://m.drice.co.kr/web/product/big/202305/4637a4db7e6187e22fb6710dba1e2862.jpg"
  }
]);
  const [reviews, setReviews] = useState<Review[]>([
    {
    snackId: 1698852495006,
    id: 1, content: "아주맛있는감자침", rating: 5 },
  ]);

  const data = useMemo<SnackContextData>(
    () => ({
      snacks: snacks,
      getSnackById: (id) => snacks.find((s) => s.id === id) ?? null,
      getSnackByName: (name) => snacks.find((s) => s.name === name) ?? null,
      filterSnacksByName: (name) =>
        snacks.filter((s) => s.name.startsWith(name)),
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
