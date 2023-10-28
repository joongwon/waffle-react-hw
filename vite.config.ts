import * as reactPlugin from "vite-plugin-react";
import type { UserConfig } from "vite";

const config: UserConfig = {
  jsx: "react",
  plugins: [reactPlugin],
  port: 5173,
};

export default config;
