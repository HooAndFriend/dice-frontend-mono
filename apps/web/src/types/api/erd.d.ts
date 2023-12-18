import { Response } from '.'
import { Table } from '../erd'

export interface TableResponse extends Response {
  data: {
    findErd: Table
  }
}
