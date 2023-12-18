export interface Table {
  id: number
  name: string
  comment: string
  column: column[]
  createUser: {
    nickname: string
    email: string
    profile: string
  }
  modifyUser: {
    nickname: string
    email: string
    profile: string
  }
}

export interface Column {
  id: number
  key: string
  name: string
  isNull: string
  option: string
  comment: string
  createUser: {
    nickname: string
    email: string
    profile: string
  }
  modifyUser: {
    nickname: string
    email: string
    profile: string
  }
}

export interface TableSaveParams {
  workspace_id: string
  name: string
  comment: string
}

export interface TableUpdateParams {
  tableId: number
  name: string
  comment: string
}

export interface ColumnSaveParams {
  table_id: number
  key: string
  name: string
  comment: string
  data_type: string
  isNull: string
  option: string
}

export interface ColumnUpdateParams {
  columnId: number
  key: string
  name: string
  comment: string
  dataType: string
  isNull: string
  option: string
}
