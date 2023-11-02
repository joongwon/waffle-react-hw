import React, { createContext, ReactNode, useContext, useState } from "react";
import "./ReviewItem.css";
import { Review, Snack, useSnackContext } from "../contexts/SnackContext";
import { Link } from "react-router-dom";
import Rating from "./Rating";

type Props = {
  review: Review;
  editingId: number | null;
  openDeleteModal: (id: number) => void;
  startEditing: (id: number) => void;
  endEditing: () => void;
  children: ReactNode;
};

// let program die if it tries to useContext outside of context
const ReviewItemContext = createContext<{ snack: Snack; props: Props }>(
  null as any,
);

function Container(props: Props) {
  const {
    review,
    startEditing,
    openDeleteModal,
    endEditing,
    editingId,
    children,
  } = props;
  const [content, setContent] = useState("");
  const { getSnackById, updateReview } = useSnackContext();
  const snack = getSnackById(props.review.snackId)!;

  return (
    <ReviewItemContext.Provider value={{ props, snack }}>
      <li
        className={
          "review-item " +
          (props.editingId === null
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
          onClick={() => openDeleteModal(review.id)}
        />
        <button
          data-testid="edit-review-save"
          className="save"
          onClick={() => {
            updateReview(review.id, content);
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
    </ReviewItemContext.Provider>
  );
}

function SnackName() {
  const { snack } = useContext(ReviewItemContext);
  return (
    <Link to={`/snacks/${snack.id}`} data-testid="snack-name">
      <h2>{snack.name}</h2>
    </Link>
  );
}

function SnackImage() {
  const { snack } = useContext(ReviewItemContext);
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
