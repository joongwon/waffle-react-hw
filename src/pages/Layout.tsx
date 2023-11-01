import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../logo.svg";
import "./Layout.css";

export default function Layout() {
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
        <NavLink to="/" end>
          리뷰
        </NavLink>
        <NavLink to="/snacks" end>
          과자
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
}
