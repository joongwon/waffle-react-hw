import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddModal from "./AddModal";
import { useSnackContext } from "../contexts/SnackContext";
import "./AddButton.css";

type ModalState = "open" | "closed" | "closing";
type MenuState = "initial" | "open" | "closed";

export default function AddButton() {
  const [menu, setMenu] = useState<MenuState>("initial");
  const [addModal, setAddModal] = useState<ModalState>("closed");
  return (
    <div
      className={
        "add-button--container" +
        (menu === "open"
          ? " add-button--open"
          : menu === "closed"
          ? " add-button--closed"
          : "")
      }
    >
      <div
        className="add-button--background"
        onClick={() => setMenu("closed")}
      />
      <div className={"add-button--menus"}>
        <Link to="/snacks/new">
          새 과자
          <span className="snack-icon" />
        </Link>
        <button
          onClick={() => {
            setMenu("closed");
            setAddModal("open");
          }}
        >
          새 리뷰
          <span className="edit-icon" />
        </button>
      </div>
      <button
        className="add-button"
        onClick={() => setMenu(menu === "open" ? "closed" : "open")}
      >
        <span>+</span>
      </button>
      {addModal !== "closed" && (
        <AddModal
          close={() => {
            setAddModal("closing");
            setTimeout(() => setAddModal("closed"), 500);
          }}
          isClosing={addModal === "closing"}
        />
      )}
    </div>
  );
}
