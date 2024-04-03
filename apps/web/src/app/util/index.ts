import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

export const { persistAtom } = recoilPersist({
  key: "sessionStorageState",
  storage: sessionStorage,
});

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

export const { persistAtom: persistStorageAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
  converter: JSON,
});
