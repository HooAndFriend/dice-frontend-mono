import { TableHeaderType, TableItemType } from '@/src/type/component'
import TableHeader from './TableHeader'
import TableItem from './TableItem'

interface PropsType {
  headerData: TableHeaderType[]
  bodyData: TableItemType[][]
  disabledClick: boolean
  userIds?: number[] // 사용자 조회에서 사용
  handleClick?: (id: number) => void
}

const CustomTable = ({
  headerData,
  bodyData,
  disabledClick,
  userIds,
  handleClick,
}: PropsType) => {
  const userIdList = userIds || [];
  return (
    <div>
      <TableHeader data={headerData} />
      {bodyData.map((item,index) => (
        <TableItem
          key={index}
          data={item}
          userId={userIdList[index]}
          disabledClick={disabledClick}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CustomTable
