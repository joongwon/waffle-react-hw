import React, { createContext, ReactNode, useContext, useState } from "react";
import "./ReviewItem.css";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Review } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { baseURL } from "../constants";

type Props = {
  review: Review;
  editingId: number | null;
  openDeleteModal: (review: Review) => void;
  startEditing: (id: number) => void;
  endEditing: () => void;
  children: ReactNode;
  refetch: () => Promise<void>;
};

// let program die if it tries to useContext outside of context
const ReviewItemContext = createContext<{ props: Props }>(null as any);

function Container(props: Props) {
  const {
    review,
    startEditing,
    openDeleteModal,
    endEditing,
    editingId,
    children,
    refetch,
  } = props;
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo, token } = useAuth();

  return (
    <ReviewItemContext.Provider value={{ props }}>
      <li
        className={
          "review-item " +
          (props.editingId === null && userInfo?.id === review.author.id
            ? "editable"
            : props.editingId === props.review.id
            ? "editing"
            : "uneditable")
        }
        data-testid="review"
      >
        {children}
        <button
          data-testid="edit-review"
          className="edit"
          onClick={() => {
            setContent(review.content);
            startEditing(review.id);
          }}
        />
        <button
          data-testid="delete-review"
          className="delete"
          onClick={() => openDeleteModal(review)}
        />
        <button
          data-testid="edit-review-save"
          className="save"
          onClick={async () => {
            setIsSubmitting(true);
            try {
              const { ok } = await updateReview(review.id, content, token);
              if (ok) {
                await refetch();
                endEditing();
              } else {
                alert("리뷰를 수정할 수 없습니다.");
              }
            } finally {
              setIsSubmitting(false);
            }
          }}
          disabled={isSubmitting}
        />
        <button
          data-testid="edit-review-cancel"
          className="cancel"
          onClick={() => endEditing()}
          disabled={isSubmitting}
        />
        {editingId === review.id ? (
          <textarea
            data-testid="edit-review-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p>{review.content}</p>
        )}
      </li>
    </ReviewItemContext.Provider>
  );
}

function SnackName() {
  const snack = useContext(ReviewItemContext).props.review.snack;
  return (
    <Link to={`/snacks/${snack.id}`} data-testid="snack-name">
      <h2>{snack.name}</h2>
    </Link>
  );
}

function SnackImage() {
  const snack = useContext(ReviewItemContext).props.review.snack;
  return <img src={snack.image} data-testid="snack-image" />;
}

function Sep() {
  return <span className="sep">/</span>;
}

function ReviewRating() {
  const {
    props: { review },
  } = useContext(ReviewItemContext);
  return <Rating className="review-item--rating">{review.rating}</Rating>;
}

const ReviewItem = {
  Container,
  SnackName,
  SnackImage,
  Sep,
  Rating: ReviewRating,
};
export default ReviewItem;

function updateReview(id: number, content: string, token: string) {
  return fetch(baseURL + `/reviews/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
}
