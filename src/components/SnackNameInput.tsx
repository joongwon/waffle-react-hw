import React, { InputHTMLAttributes, useState, useEffect, useRef } from "react";
import { ChangeEventHandler } from "react";
import { Snack } from "../types";
import "./SnackNameInput.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  filteredSnacks: Snack[];
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onFocus" | "onChange" | "onBlur"
>;

export default function SnackNameInput({
  onChange,
  filteredSnacks,
  ...inputProps
}: Props) {
  const { value } = inputProps;
  const [isComplOpen, setIsComplOpen] = useState(false);
  const ti = useRef<number | null>(null);

  return (
    <div className="snack-name">
      <input
        {...inputProps}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsComplOpen(true);
          if (ti.current) {
            clearTimeout(ti.current);
            ti.current = null;
          }
        }}
        onBlur={() => {
          ti.current = setTimeout(() => setIsComplOpen(false), 200);
        }}
      />
      {isComplOpen &&
        ((filteredSnacks.length ?? 0) > 0 ? (
          <ul
            className="snack-name--completion"
            data-testid="snack-name-compl-list"
          >
            {filteredSnacks.map((s) => (
              <li
                key={s.id}
                onClick={() => {
                  onChange(s.name);
                }}
              >
                {s.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="snack-name--empty">해당 이름의 과자가 없습니다</p>
        ))}
    </div>
  );
}
