interface PropsType {
  title: string
  value: number
}

const NumberBox = ({ title, value }: PropsType) => {
  return (
    <div className="h-[130px] w-1/4 bg-white rounded-[10px] p-4 mx-4">
      <div>
        <h1 className="text-[19px] font-bold">{title}</h1>
      </div>
      <div className="flex items-end justify-end">
        <h1 className="text-[48px] font-bold">{value}</h1>
      </div>
    </div>
  )
}

export default NumberBox
