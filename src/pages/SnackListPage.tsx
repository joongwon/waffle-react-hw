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
        <li key={s.id} data-testid="snack-card">
          <img src={s.image} data-testid="snack-image"/>
          <Link to={`/snacks/${s.id}`} data-testid="snack-name">
            <h2>{s.name}</h2>
          </Link>
          <Rating>{5}</Rating>
        </li>
      ))}
    </ul>
  );
}
