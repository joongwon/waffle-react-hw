import React, { useState } from "react";
import star from "./star.svg";
import "./ReviewItem.css";
import { Review } from "./reviewData";

type Props = {
  review: Review;
  editingId: number | null;
  update: (id: number, content: string) => void;
  deleteReview: (id: number) => void;
  startEditing: (id: number) => void;
  endEditing: () => void;
};

export default function ReviewItem({
  review,
  editingId,
  update,
  startEditing,
  endEditing,
  deleteReview,
}: Props) {
  const [content, setContent] = useState("");

  return (
    <li
      className={
        "review-item " +
        (editingId === null
          ? "editable"
          : editingId === review.id
          ? "editing"
          : "uneditable")
      }
      data-testid="review"
    >
      <img src={review.image} data-testid="snack-image" />
      <h2>{review.snack_name}</h2>
      <span className="sep">/</span>
      <span className="rating">
        <span className="star" />
        {review.rating.toFixed(1)}
      </span>
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
        onClick={() => deleteReview(review.id)}
      />
      <button
        data-testid="edit-review-save"
        className="save"
        onClick={() => {
          update(review.id, content);
          endEditing();
        }}
      />
      <button
        data-testid="edit-review-cancel"
        className="cancel"
        onClick={() => endEditing()}
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
  );
}
