import React, { useState } from "react";
import ReviewItem from "../components/ReviewItem";
import "./ReviewListPage.css";
import DeleteModal from "../components/DeleteModal";
import AddButton from "../components/AddButton";
import { Review } from "../types";
import { deleteReview, useReviewList } from "../api";
import { useAuth } from "../contexts/AuthContext";

type DeleteModalState =
  | { state: "open" | "closing"; review: Review }
  | { state: "closed" };

export default function ReviewListPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    state: "closed",
  });
  const { reviews, refetch } = useReviewList();
  const { token } = useAuth();

  const openDeleteModal = (review: Review) => {
    setDeleteModal({
      state: "open",
      review,
    });
  };

  return (
    <>
      <ul data-testid="review-list" className="review-list">
        {reviews?.map((r) => (
          <ReviewItem.Container
            review={r}
            key={r.id}
            editingId={editingId}
            startEditing={setEditingId}
            endEditing={() => setEditingId(null)}
            openDeleteModal={openDeleteModal}
            refetch={refetch}
          >
            <ReviewItem.SnackImage />
            <ReviewItem.SnackName />
            <ReviewItem.Sep />
            <ReviewItem.Rating />
          </ReviewItem.Container>
        ))}
      </ul>
      <AddButton refetch={refetch} />
      {deleteModal.state !== "closed" && (
        <DeleteModal
          isClosing={deleteModal.state === "closing"}
          deleteReview={() =>
            deleteReview(deleteModal.review.id, token).then((res) => {
              if (res.ok) {
                refetch();
              } else {
                alert("리뷰를 삭제할 수 없습니다.");
              }
            })
          }
          close={() => {
            setDeleteModal({ state: "closing", review: deleteModal.review });
            setTimeout(() => setDeleteModal({ state: "closed" }), 500);
          }}
          snack={deleteModal.review.snack.name}
        />
      )}
    </>
  );
}
