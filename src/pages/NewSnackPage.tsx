import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackContext } from "../contexts/SnackContext";
import "./NewSnackPage.css";

function beginOrEndWithBlank(s: string) {
  return s.match(/^\s|\s$/) !== null;
}

export default function NewSnackPage() {
  const [imgInput, setImgInput] = useState("");
  const [imgDisplay, setImgDisplay] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [tid, setTid] = useState<number | null>(null);
  const [error, setError] = useState<{
    img?: string;
    name?: string;
  }>({});
  const { addSnack } = useSnackContext();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const imgError =
      imgDisplay === null ? "올바른 이미지 주소를 입력하세요" : undefined;
    const nameError =
      name.length < 1 || name.length > 20 || beginOrEndWithBlank(name)
        ? "첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요"
        : undefined;

    if (imgError || nameError) {
      setError({
        img: imgError,
        name: nameError,
      });
    } else {
      const id = Date.now();
      addSnack({
        id,
        name: name,
        image: imgInput,
      });
      navigate(`/snacks/${id}`);
    }
  };
  return (
    <div className="new-snack">
      <h2>새 과자</h2>
      <img src={imgDisplay ?? undefined} onError={() => setImgDisplay(null)} />
      <label htmlFor="new-snack--img">이미지</label>
      <input
        id="new-snack--img"
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
      />
      <p>{error.img}</p>
      <label htmlFor="new-snack--name">과자 이름</label>
      <input
        id="new-snack--name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>{error.name}</p>
      <div className="buttons">
        <button className="submit" onClick={handleSubmit}>
          추가
        </button>
        <Link className="cancel" to="/">
          취소
        </Link>
      </div>
    </div>
  );
}
