import { TableItemType } from '@/src/type/component'

interface PropsType {
  data: TableItemType[]
  userId?: number
  disabledClick: boolean
  handleClick?: (id: number) => void
}

const TableItem = ({ data, disabledClick, userId, handleClick }: PropsType) => {
  return (
    <div
      className={`w-full flex items-center h-[45px] ${
        !disabledClick && 'hover:bg-slate-400'
      }`}
      onClick={() => {
        
        if (!disabledClick && handleClick) {
          if (userId !== undefined) {
            handleClick(userId); // 사용자 ID를 handleClick 콜백에 전달
          } else {
            handleClick(1)
          }
        }
      }}
    >
      {data.map((item, index) => (
        <div className={`pl-4 w-[${item.size}]`} style={{ width: item.size }} key={index}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default TableItem
