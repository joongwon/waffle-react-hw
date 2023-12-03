import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
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
  const { token } = useAuth();
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
      addSnack({
        name: name,
        image: imgInput,
      }, token).then((res) => {
        if (res.ok) return res.json();
        else throw new Error("add snack failed");
      }).then((data) => {
        navigate(`/snacks/${data.id}`);
      }).catch((err) => {
        alert("과자를 추가할 수 없습니다.");
      });
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
        data-testid="image-input"
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
        data-testid="name-input"
        onChange={(e) => setName(e.target.value)}
      />
      <p data-testid="snack-name-error">{error.name}</p>
      <div className="buttons">
        <button
          className="submit"
          onClick={handleSubmit}
          data-testid="add-button"
          disabled={imgDisplay === null}
        >
          추가
        </button>
        <Link className="cancel" to="/" data-testid="cancel-button">
          취소
        </Link>
      </div>
    </div>
  );
}

function addSnack(snack: { name: string, image: string }, token: string) {
  return fetch(baseURL + "/snacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(snack),
  });
}
