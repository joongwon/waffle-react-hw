import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import ReviewListPage from "./pages/ReviewListPage";
import SnackListPage from "./pages/SnackListPage";
import SnackItemPage from "./pages/SnackItemPage";
import NewSnackPage from "./pages/NewSnackPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext, UserInfo } from "./contexts/AuthContext";
import { baseURL } from "./constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ReviewListPage />,
      },
      {
        path: "/snacks",
        element: <SnackListPage />,
      },
      {
        path: "/snacks/:id",
        element: <SnackItemPage />,
      },
      {
        path: "/snacks/new",
        element: <NewSnackPage />,
      },
      {
        path: "/login",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

const loginRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        // "/*" cannot match "/"
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/*",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

// _token, _userInfo: initial values
function App({
  token: _token,
  userInfo: _userInfo,
}: {
  token: string | null;
  userInfo: UserInfo | null;
}) {
  const [token, setToken] = useState<string | null>(_token);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(_userInfo);
  const logout = () => {
    setToken(null);
    setUserInfo(null);
    fetch(baseURL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    }); // ignore response
  };
  const login = async (username: string, password: string) => {
    const loginRes = await fetch(baseURL + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!loginRes.ok) return;
    const { access_token, user } = await loginRes.json();
    setToken(access_token);
    setUserInfo(user);
  };
  return token && userInfo ? (
    <AuthContext.Provider value={{ login, auth: { token, logout, userInfo } }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  ) : (
    <AuthContext.Provider value={{ login, auth: null }}>
      <RouterProvider router={loginRouter} />
    </AuthContext.Provider>
  );
}

async function main() {
  let _token = null;
  let _userInfo = null;
  try {
    const refreshRes = await fetch(baseURL + "/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (!refreshRes.ok) throw new Error("not ok");
    const { access_token } = await refreshRes.json();
    const userRes = await fetch(baseURL + "/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!userRes.ok) throw new Error("not ok");
    const userInfo = await userRes.json();

    _token = access_token;
    _userInfo = userInfo.user;
  } catch (_) {
    // ignore
  }

  ReactDOM.render(
    <React.StrictMode>
      <App token={_token} userInfo={_userInfo} />
    </React.StrictMode>,
    document.getElementById("root"),
  );
}

main();
