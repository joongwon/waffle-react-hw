import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../logo.svg";
import "./Layout.css";
import { AuthContext, useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <div className="layout">
      <header data-testid="header">
        <a href="https://wafflestudio.com">
          <img
            src={logo}
            alt="와플스튜디오"
            width="50"
            data-testid="waffle-logo"
          />
          <h1 data-testid="header-title">과자 리뷰</h1>
        </a>
        <NavLink to="/" end data-testid="review">
          리뷰
        </NavLink>
        <NavLink to="/snacks" end data-testid="snack">
          과자
        </NavLink>
        {auth && <span>{auth.userInfo.username}님 안녕하세요!</span>}
      </header>
      <Outlet />
    </div>
  );
}
