interface ProtoTypes {
  count: number
  pageSize: number
  handlePage: (page:number)=>void
}

const TablePagination = ({ count, pageSize, handlePage }) => {
  const maxPage = Math.ceil(count / pageSize)
  
  const pageArray = Array.from({length: maxPage}, (_,index) => index)
  return (
    <div className="w-[215px] flex items-center h-[45px]">
      <div className="mr-4">{'<'}</div>
        {pageArray.map(page => (
          <div className="mr-4" key={page} onClick={()=>handlePage(page)}>{page+1}</div>
        ))}
      <div className="mr-4">{'>'}</div>
    </div>
  )
}

export default TablePagination
