import { TableHeaderType } from '@/src/type/component'

interface PropsType {
  data: TableHeaderType[]
}

const TableHeader = ({ data }: PropsType) => {
  return (
    <div className="w-full bg-[#F6F6F6] flex items-center h-[45px] rounded-tl-log rounded-tr-lg">
      {data.map((item, index) => (
        <div className={`pl-4`} style={{ width: item.size }} key={index}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default TableHeader
