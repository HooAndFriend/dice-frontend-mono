import { CommonResponse } from "../common";

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

export type TicketStatus = "REOPEN" | "FINISH" | "DOING";

export interface UploadFileResponse extends CommonResponse, UploadFile {}

export interface UploadFile {
  Bucket: string;
  ETag: string;
  Key: string;
  Location: string;
  key: string;
  url: string;
}
