export type Review = {
  id: number;
  snack_name: string;
  image: string;
  rating: number;
  content: string;
};

export const initialReviews: Review[] = [
  {
    id: 101,
    snack_name: "얼큰한 너구리",
    image: "https://image.nongshim.com/non/pro/1598000561204.jpg",
    rating: 5,
    content: "오동통통한 면과 동봉된 다시마가 맛있습니다",
  },
  {
    id: 103,
    snack_name: "맥콜",
    image:
      "https://img.danawa.com/prod_img/500000/350/174/img/3174350_1.jpg?shrink=330:*&_v=20220421104604",
    rating: 4,
    content: "보리차와 콜라가 반반 섞인 듯한 맛이 독특합니다.",
  },
];
