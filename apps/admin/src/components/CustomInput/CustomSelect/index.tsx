interface PropsType {
  option: string
}

const CustomSelect = ({ option }: PropsType) => {
  return (
    <select className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] text-[#EBEBEC] pl-4">
      <option>{option}</option>
    </select>
  )
}

export default CustomSelect
