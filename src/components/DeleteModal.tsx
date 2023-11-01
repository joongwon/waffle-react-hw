import React from "react";
import Modal from "./Modal";
import "./DeleteModal.css";

type Props = {
  close: () => void;
  isClosing: boolean;
  deleteReview: () => void;
  snack: string;
};

export default function DeleteModal({
  close,
  isClosing,
  snack,
  deleteReview,
}: Props) {
  return (
    <Modal isClosing={isClosing} onBackgroundClick={close}>
      <div className="delete-modal">
        <h1>리뷰 삭제</h1>
        <p>"{snack}"에 대한 리뷰를 삭제하시겠습니가?</p>
        <div className="buttons">
          <button
            data-testid="delete-review-delete"
            disabled={isClosing}
            className="delete"
            onClick={() => {
              deleteReview();
              close();
            }}
          >
            삭제
          </button>
          <button
            data-testid="delete-review-cancel"
            disabled={isClosing}
            className="cancel"
            onClick={close}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
