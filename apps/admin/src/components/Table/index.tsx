import { TableHeaderType, TableItemType } from '@/src/type/component'
import TableHeader from './TableHeader'
import TableItem from './TableItem'

interface PropsType {
  headerData: TableHeaderType[]
  bodyData: TableItemType[][]
  disabledClick: boolean
  ids?: number[]
  handleClick?: (id: number) => void
}

const CustomTable = ({
  headerData,
  bodyData,
  disabledClick,
  ids,
  handleClick,
}: PropsType) => {
  const idList = ids || []
  const filteredBodyData = bodyData.map((data) => {
    const filteredData: TableItemType[] = []
    data.forEach((item) => {
      if (item.size !== '0%') {
        filteredData.push(item)
      }
    })
    return filteredData
  })

  return (
    <div>
      <TableHeader data={headerData} />
      {filteredBodyData.map((item, index) => (
        <TableItem
          key={index}
          data={item}
          id={idList[index]}
          disabledClick={disabledClick}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

export default CustomTable
