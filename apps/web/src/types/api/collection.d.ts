import type { Response } from '.'
import type { Collection } from '../collection'

export interface CollectionV0ListResponse extends Response {
  data: { data: Collection[]; count: number }
}
