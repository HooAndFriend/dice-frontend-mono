import { TableItemType } from '@/src/type/component'

interface PropsType {
  data: TableItemType[]
  id?: number
  disabledClick: boolean
  handleClick?: (id: number) => void
}

const TableItem = ({ data, disabledClick, id, handleClick }: PropsType) => {
  return (
    <div
      className={`w-full flex items-center h-[45px] ${!disabledClick && 'hover:bg-slate-400'}`}
      onClick={() => {
        if (!disabledClick && handleClick) {
          if (id !== undefined) {
            handleClick(id) // 선택된 ID를 handleClick 콜백에 전달
          } else {
            handleClick(1)
          }
        }
      }}
    >
      {data.map((item, index) => (
        <div
          className={`pl-4 w-[${item.size}]`}
          style={{ width: item.size }}
          key={index}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default TableItem
