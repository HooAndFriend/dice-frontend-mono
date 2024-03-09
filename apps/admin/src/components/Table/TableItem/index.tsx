import { TableItemType } from '@/src/type/component'

interface PropsType {
  data: TableItemType[]
}

const TableItem = ({ data }: PropsType) => {
  return (
    <div className="w-full flex items-center h-[45px]">
      {data.map((item) => (
        <div className={`pl-4 w-[${item.size}]`}>{item.name}</div>
      ))}
    </div>
  )
}

export default TableItem
