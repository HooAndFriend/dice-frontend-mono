interface PropsType {
  title: string
  isExpose: boolean
  color: string
  memo: string
}

const StateBox = ({ title, isExpose, color, memo }: PropsType) => {
  return (
    <div className="w-1/4 p-4 border-solid border-[1px] border-black rounded-[10px] mr-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-[20px]">{title}</h1>
        <button className="text-[#623AD6]">수정</button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="font-bold text-[14px]">노출 여부</h1>
        <h1 className="text-[14px]">{isExpose ? '노출' : '미노출'}</h1>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="font-bold text-[14px]">색상 설정</h1>
        <h1 className="text-[14px]">{color}</h1>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="font-bold text-[14px]">메모</h1>
        <h1 className="text-[14px]">{memo}</h1>
      </div>
    </div>
  )
}

export default StateBox
