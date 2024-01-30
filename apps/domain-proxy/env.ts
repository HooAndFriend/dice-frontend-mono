import fs from "fs";

interface Env {
  readonly SERVER_BASE_URL: string;
}

export default fs
  .readFileSync(".env", "utf8")
  .split("\n")
  .reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    return !key || !value ? acc : Object.assign(acc, { [key]: value });
  }, {} as Env);
