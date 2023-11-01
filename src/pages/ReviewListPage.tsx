import React, { useState } from "react";
import ReviewItem from "../components/ReviewItem";
import "./ReviewListPage.css";
import DeleteModal from "../components/DeleteModal";
import { Review, useSnackContext } from "../contexts/SnackContext";
import AddButton from "../components/AddButton";

type DeleteModalState =
  | { state: "open"; review: Review }
  | { state: "closed" }
  | { state: "closing"; review: Review };

export default function ReviewListPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    state: "closed",
  });
  const { deleteReview, getReviewById, reviews, getSnackById } =
    useSnackContext();

  const openDeleteModal = (id: number) => {
    setDeleteModal({
      state: "open",
      review: getReviewById(id)!,
    });
  };

  return (
    <>
      <ul data-testid="review-list" className="review-list">
        {reviews.map((r) => (
          <ReviewItem.Container
            review={r}
            key={r.id}
            editingId={editingId}
            startEditing={setEditingId}
            endEditing={() => setEditingId(null)}
            openDeleteModal={openDeleteModal}
          >
            <ReviewItem.SnackImage />
            <ReviewItem.SnackName />
            <ReviewItem.Sep />
            <ReviewItem.Rating />
          </ReviewItem.Container>
        ))}
      </ul>
      <AddButton />
      {deleteModal.state !== "closed" && (
        <DeleteModal
          isClosing={deleteModal.state === "closing"}
          deleteReview={() => deleteReview(deleteModal.review.id)}
          close={() => {
            setDeleteModal({ state: "closing", review: deleteModal.review });
            setTimeout(() => setDeleteModal({ state: "closed" }), 500);
          }}
          snack={getSnackById(deleteModal.review.snackId)!.name}
        />
      )}
    </>
  );
}
