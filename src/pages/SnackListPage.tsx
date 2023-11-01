import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useSnackContext } from "../contexts/SnackContext";
import "./SnackListPage.css";

export default function SnackListPage() {
  const { snacks } = useSnackContext();
  return (
    <ul className="snack-list">
      {snacks.map((s) => (
        <li key={s.id}>
          <img src={s.image} />
          <Link to={`/snacks/${s.id}`}>
            <h2>{s.name}</h2>
          </Link>
          <Rating>{5}</Rating>
        </li>
      ))}
    </ul>
  );
}
