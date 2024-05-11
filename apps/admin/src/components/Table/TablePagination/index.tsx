interface PropsType {
  count?: number
  pageSize?: number
  handlePage?: (page: number) => void
}

const TablePagination = ({
  count = 0,
  pageSize = 10,
  handlePage = () => { },
}: PropsType) => {
  const maxPage = Math.ceil(count / pageSize)
  const pageArray = Array.from({ length: maxPage }, (_, index) => index)
  return (
    <div className="w-[215px] flex items-center h-[45px]">
      <div className="mr-4">{'<'}</div>
      {count < pageSize && (
        <div className="mr-4" onClick={() => handlePage(pageArray[0])}>
          1
        </div>
      )}
      {count > pageSize && pageArray.map((page) => (
        <div className="mr-4" key={page} onClick={() => handlePage(page)}>
          {page + 1}
        </div>
      ))}
      <div className="mr-4">{'>'}</div>
    </div>
  )
}

export default TablePagination
