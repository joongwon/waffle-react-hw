import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { baseURL } from "../constants";
import { Snack } from "../types";
import "./SnackListPage.css";

export default function SnackListPage() {
  const snacks = useSnacks();
  return (
    <ul className="snack-list">
      {snacks?.map((s) => (
        <li key={s.id} data-testid="snack-card">
          <img src={s.image} data-testid="snack-image" />
          <Link to={`/snacks/${s.id}`} data-testid="snack-name">
            <h2>{s.name}</h2>
          </Link>
          <Rating>{s.rating}</Rating>
        </li>
      ))}
    </ul>
  );
}

function useSnacks() {
  const [snacks, setSnacks] = useState<Snack[] | null>(null);
  useEffect(() => {
    fetch(baseURL + "/snacks")
      .then((res) => res.json())
      .then((data) => setSnacks(data))
      .catch((err) => console.error(err));
  }, []);
  return snacks;
}
