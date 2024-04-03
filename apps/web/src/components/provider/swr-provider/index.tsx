"use client";

// ** SWR Config
import { Middleware, SWRConfig, SWRHook } from "swr";

const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  const myMiddleware: Middleware = (useSWRNext: SWRHook) => {
    return (key, fetcher, config) => {
      const swr = useSWRNext(key, fetcher, config);

      return swr;
    };
  };
  return <SWRConfig value={{ use: [myMiddleware] }}>{children}</SWRConfig>;
};

export default SwrProvider;
