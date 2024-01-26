export interface DialogArgs {
  title: string;
  message: string;
  buttonText: string;
  comfirmButtonText?: string;
  type: DialogType;
  logLevel: LogLevel;
}

export type LogLevel = "" | "warn" | "info";
export type DialogType = "" | "comfirm" | "alert";
