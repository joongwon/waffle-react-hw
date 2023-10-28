import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { Review } from "./reviewData";
import "./AddModal.css";

type Props = {
  close: () => void;
  addReview: (review: Review) => void;
  isClosing: boolean;
};

function beginOrEndWithBlank(s: string) {
  return s.match(/^\s|\s$/) !== null;
}

export default function AddModal({ close, addReview, isClosing }: Props) {
  const [imgInput, setImgInput] = useState("");
  const [imgDisplay, setImgDisplay] = useState<string | null>(null);
  const [snack, setSnack] = useState("");
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState<{
    img?: string;
    snack?: string;
    rating?: string;
    content?: string;
  }>({});
  const [tid, setTid] = useState<number | null>(null);

  const handleSubmit = () => {
    const imgError =
      imgDisplay === null ? "올바른 이미지 주소를 입력하세요" : undefined;
    const snackError =
      snack.length < 1 || snack.length > 20 || beginOrEndWithBlank(snack)
        ? "첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요"
        : undefined;
    const ratingError =
      rating.match(/^[1-5]$/) === null
        ? "평점은 1 ~ 5 사이의 숫자로 써주세요"
        : undefined;
    const contentError =
      content.length < 5 ||
      content.length > 1000 ||
      beginOrEndWithBlank(content)
        ? "첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요"
        : undefined;

    if (imgError || snackError || ratingError || contentError) {
      setError({
        img: imgError,
        snack: snackError,
        rating: ratingError,
        content: contentError,
      });
    } else {
      addReview({
        id: Date.now(),
        snack_name: snack,
        image: imgInput,
        rating: Number(rating),
        content: content,
      });
      close();
    }
  };

  return (
    <Modal onBackgroundClick={close} isClosing={isClosing}>
      <div className="add-modal" data-testid="write-review-modal">
        <h1>리뷰 추가</h1>
        <img
          src={imgDisplay ?? undefined}
          onError={() => setImgDisplay(null)}
        />
        <label htmlFor="add-modal--img">이미지</label>
        <input
          disabled={isClosing}
          id="add-modal--img"
          value={imgInput}
          onChange={(e) => {
            if (tid !== null) clearTimeout(tid);
            setImgInput(e.target.value);
            setTid(
              setTimeout(() => {
                setImgDisplay(e.target.value);
              }, 1000),
            );
          }}
          data-testid="image-input"
        />
        <p>{error.img}</p>
        <label htmlFor="add-modal--snack">과자 이름</label>
        <input
          disabled={isClosing}
          id="add-modal--snack"
          value={snack}
          onChange={(e) => setSnack(e.target.value)}
          data-testid="name-input"
        />
        <p data-testid="name-input-message">{error.snack}</p>
        <label htmlFor="add-modal--rating">평점</label>
        <input
          disabled={isClosing}
          id="add-modal--rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          data-testid="rating-input"
          type="number"
        />
        <p data-testid="rating-input-message">{error.rating}</p>
        <label htmlFor="add-modal--content">내용</label>
        <textarea
          disabled={isClosing}
          id="add-modal--content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          data-testid="content-input"
        />
        <p data-testid="content-input-message">{error.content}</p>
        <div className="buttons">
          <button
            disabled={isClosing || imgDisplay === null}
            className="submit"
            onClick={handleSubmit}
            data-testid="submit-review"
          >
            작성
          </button>
          <button
            disabled={isClosing}
            className="cancel"
            onClick={close}
            data-testid="cancel-review"
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
