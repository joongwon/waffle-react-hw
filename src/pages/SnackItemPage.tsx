import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import Rating from "../components/Rating";
import ReviewItem from "../components/ReviewItem";
import { Snack, useSnackContext, Review } from "../contexts/SnackContext";
import "./SnackItemPage.css";

export default function SnackItemPage() {
  const { getSnackById } = useSnackContext();
  const { id } = useParams();
  const nid = Number(id);
  if (Number.isNaN(nid)) return <div>잘못된 페이지입니다</div>;
  const snack = getSnackById(nid);
  if (snack === null) return <div>해당 과자를 찾을 수 없습니다</div>;
  return <SnackItemImpl snack={snack} />;
}

type DeleteModalState =
  | { state: "open"; review: Review }
  | { state: "closed" }
  | { state: "closing"; review: Review };

function SnackItemImpl({ snack }: { snack: Snack }) {
  const { getReviewsBySnackId, getReviewById, deleteReview, getSnackById } =
    useSnackContext();
  const reviews = getReviewsBySnackId(snack.id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    state: "closed",
  });
  const openDeleteModal = (id: number) => {
    setDeleteModal({
      state: "open",
      review: getReviewById(id)!,
    });
  };
  return (
    <>
      <div className="snack-card" data-testid="snack-card">
        <img src={snack.image} data-testid="snack-image"/>
        <h2 data-testid="snack-name">{snack.name}</h2>
        <Rating>{5}</Rating>
      </div>
      <ul className="snack-review-list" data-testid="review-list">
        {reviews.map((r) => (
          <ReviewItem.Container
            review={r}
            key={r.id}
            editingId={editingId}
            startEditing={setEditingId}
            endEditing={() => setEditingId(null)}
            openDeleteModal={openDeleteModal}
          >
            <ReviewItem.Rating />
          </ReviewItem.Container>
        ))}
      </ul>
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
