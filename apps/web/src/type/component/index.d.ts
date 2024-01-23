export interface DialogArgs {
  title: string;
  message: string;
  buttonText: string;
  logLevel: LogLevel;
}

export type LogLevel = "" | "warn" | "info";
