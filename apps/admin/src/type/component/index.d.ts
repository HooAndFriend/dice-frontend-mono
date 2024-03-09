export interface DialogArgs {
  title: string
  message: string
  buttonText: string
  comfirmButtonText?: string
  type: DialogType
  logLevel: LogLevel
}

export type LogLevel = '' | 'warn' | 'info'
export type DialogType = '' | 'comfirm' | 'alert'

export interface TableHeaderType {
  name: string
  size: string
}

export interface TableItemType {
  name: string
  size: string
}
