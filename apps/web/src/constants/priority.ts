import { EpicStatus } from '../type/epic'

export interface IPriortiry {
  value: Priortiry
  label: string
  orderId: number
  image: string
}

export type Priortiry = 'HIGHEST' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOWEST'
export const PRIORITY_LIST: IPriortiry[] = [
  {
    label: 'Highest',
    value: 'HIGHEST',
    orderId: 0,
    image: '/images/highest.png',
  },
  { label: 'High', value: 'HIGH', orderId: 1, image: '/images/high.png' },
  {
    label: 'Medium',
    value: 'MEDIUM',
    orderId: 2,
    image: '/images/medium.png',
  },
  { label: 'Low', value: 'LOW', orderId: 3, image: '/images/low.png' },
  {
    label: 'Lowest',
    value: 'LOWEST',
    orderId: 4,
    image: '/images/lowest.png',
  },
]

export const getPriortiryImage = (priority: Priortiry) => {
  return PRIORITY_LIST.find((p) => p.value === priority)?.image
}

export const getPriortiryLabel = (priority: Priortiry) => {
  return PRIORITY_LIST.find((p) => p.value === priority)?.label
}
