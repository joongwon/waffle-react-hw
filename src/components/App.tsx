import React, { useState } from "react";
import logo from "./logo.svg";
import ReviewItem from "./ReviewItem";
import "./App.css";
import AddModal from "./AddModal";
import { initialReviews, Review } from "./reviewData";
import DeleteModal from "./DeleteModal";

type ModalState = "open" | "closed" | "closing";

type DeleteModalState =
  | { state: "open"; review: Review }
  | { state: "closed" }
  | { state: "closing"; review: Review };

function App() {
  const [reviews, setReviews] = useState(initialReviews);
  const [addModal, setAddModal] = useState<ModalState>("closed");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    state: "closed",
  });

  const addReview = (review: Review) => {
    setReviews([review, ...reviews]);
  };

  const updateReview = (id: number, content: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, content: content } : r)),
    );
  };

  const deleteReview = (id: number) => {
    setDeleteModal({
      state: "open",
      review: reviews.find((r) => r.id === id)!,
    });
  };

  return (
    <div className="app">
      <header data-testid="header">
        <a href="https://wafflestudio.com">
          <img
            src={logo}
            alt="와플스튜디오"
            width="50"
            data-testid="waffle-logo"
          />
          <h1 data-testid="header-title">과자 리뷰</h1>
        </a>
      </header>
      <ul data-testid="review-list">
        {reviews.map((r) => (
          <ReviewItem
            review={r}
            key={r.id}
            editingId={editingId}
            startEditing={setEditingId}
            update={updateReview}
            endEditing={() => setEditingId(null)}
            openDeleteModal={deleteReview}
          />
        ))}
      </ul>
      <button
        className="add"
        data-testid="write-review"
        onClick={() => setAddModal("open")}
      >
        +
      </button>
      {addModal !== "closed" && (
        <AddModal
          close={() => {
            setAddModal("closing");
            setTimeout(() => setAddModal("closed"), 500);
          }}
          addReview={addReview}
          isClosing={addModal === "closing"}
        />
      )}
      {deleteModal.state !== "closed" && (
        <DeleteModal
          isClosing={deleteModal.state === "closing"}
          deleteReview={() =>
            setReviews(reviews.filter((r) => r.id !== deleteModal.review.id))
          }
          close={() => {
            setDeleteModal({ state: "closing", review: deleteModal.review });
            setTimeout(() => setDeleteModal({ state: "closed" }), 500);
          }}
          snack={deleteModal.review.snack_name}
        />
      )}
    </div>
  );
}

export default App;
