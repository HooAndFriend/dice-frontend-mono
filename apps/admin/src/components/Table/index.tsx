import { TableHeaderType, TableItemType } from '@/src/type/component'
import TableHeader from './TableHeader'
import TableItem from './TableItem'

interface PropsType {
  headerData: TableHeaderType[]
  bodyData: TableItemType[][]
}

const CustomTable = ({ headerData, bodyData }: PropsType) => {
  return (
    <div>
      <TableHeader data={headerData} />
      {bodyData.map((item) => (
        <TableItem data={item} />
      ))}
    </div>
  )
}

export default CustomTable
