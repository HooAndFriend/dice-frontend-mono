import { TableItemType } from '@/src/type/component'

interface PropsType {
  data: TableItemType[]
  disabledClick: boolean
  handleClick?: (id: number) => void
}

const TableItem = ({ data, disabledClick, handleClick }: PropsType) => {
  return (
    <div
      className="w-full flex items-center h-[45px] hover:bg-slate-400"
      onClick={() => {
        if (!disabledClick && handleClick) {
          handleClick(1)
        }
      }}
    >
      {data.map((item) => (
        <div className={`pl-4 w-[${item.size}]`} style={{ width: item.size }}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default TableItem
