import { createContext, useContext } from "react";

export type UserInfo = {
  id: number;
  username: string;
};

export const AuthContext = createContext<{
  login: (username: string, password: string) => void;
  auth: { token: string; logout: () => void; userInfo: UserInfo } | null;
}>({
  login: (username: string, password: string): void => {
    throw new Error("Not implemented");
  },
  auth: null,
});

export function useAuth() {
  const auth = useContext(AuthContext).auth;
  if (!auth) throw new Error("Cannot find AuthContext");
  return auth;
}
