import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, useReviewList, useSnack } from "../api";
import DeleteModal from "../components/DeleteModal";
import Rating from "../components/Rating";
import ReviewItem from "../components/ReviewItem";
import { useAuth } from "../contexts/AuthContext";
import { Review } from "../types";
import "./SnackItemPage.css";

export default function SnackItemPage() {
  const { id } = useParams();
  const nid = Number(id);
  if (Number.isNaN(nid)) return <div>잘못된 페이지입니다</div>;
  return <SnackItemImpl id={nid} />;
}

type DeleteModalState =
  | { state: "open" | "closing"; review: Review }
  | { state: "closed" };

function SnackItemImpl({ id }: { id: number }) {
  const snack = useSnack(id);
  const { reviews, refetch } = useReviewList(id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    state: "closed",
  });
  const openDeleteModal = (review: Review) => {
    setDeleteModal({
      state: "open",
      review,
    });
  };
  const { token } = useAuth();
  return (
    <>
      <div className="snack-card" data-testid="snack-card">
        <img src={snack?.image ?? ""} data-testid="snack-image" />
        <h2 data-testid="snack-name">{snack?.name}</h2>
        <Rating>{snack?.rating ?? null}</Rating>
      </div>
      <ul className="snack-review-list" data-testid="review-list">
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
            <ReviewItem.Rating />
          </ReviewItem.Container>
        ))}
      </ul>
      {deleteModal.state !== "closed" && (
        <DeleteModal
          isClosing={deleteModal.state === "closing"}
          deleteReview={() =>
            deleteReview(deleteModal.review.id, token).then((res) => {
              if (res.ok) refetch();
              else alert("리뷰를 삭제할 수 없습니다");
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
