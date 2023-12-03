import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <form
      className="login"
      onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}
    >
      <h1>로그인</h1>
      <label>
        ID
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        PW
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  );
}
