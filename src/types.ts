export type Snack = {
  id: number;
  name: string;
  image: string;
  rating: number;
};

export type Review = {
  id: number;
  snack: Snack;
  rating: number | null;
  content: string;
};
