import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import env from "./env";

const proxyMiddleware = createProxyMiddleware({
  changeOrigin: true,
  logLevel: "info",
  // onProxyReq: ({ host, method, path }) => {
  //   if (env.SERVER_BASE_URL.includes(host)) {
  //     const url = new URL(path, env.SERVER_BASE_URL);
  //     process.stdout.write(`[API - ${host}] ${method} ${url.pathname}\n`);
  //   }
  // },
  router: {
    "www.vs.localhost:8888/api/v1": env.SERVER_BASE_URL,
    "www.vs.localhost:8888/admin": "http://localhost:3001",
    "www.vs.localhost:8888/download": "http://localhost:3002",
    "www.vs.localhost:8888": "http://localhost:3000",
  },
  ws: true,
});

const app = express();
app.use(proxyMiddleware);
app.listen(8888);
