export interface CommonResponse<T> {
  data?: T
}

export type AlertType = 'error' | 'info' | 'success' | 'warning'

export interface Alerts {
  content: string
  type: AlertType
}
