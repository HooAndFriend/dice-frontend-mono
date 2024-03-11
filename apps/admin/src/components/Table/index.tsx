import { TableHeaderType, TableItemType } from '@/src/type/component'
import TableHeader from './TableHeader'
import TableItem from './TableItem'

interface PropsType {
  headerData: TableHeaderType[]
  bodyData: TableItemType[][]
  disabledClick: boolean
  handleClick?: (id: number) => void
}

const CustomTable = ({
  headerData,
  bodyData,
  disabledClick,
  handleClick,
}: PropsType) => {
  return (
    <div>
      <TableHeader data={headerData} />
      {bodyData.map((item) => (
        <TableItem
          data={item}
          disabledClick={disabledClick}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CustomTable
