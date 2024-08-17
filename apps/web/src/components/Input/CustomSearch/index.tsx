import Image from 'next/image'
import CustomImage from '../../Image/CustomImage'

interface PropsType {
  value?: string
  name?: string
  width?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomSearch = ({ value, onChange, name, width }: PropsType) => {
  return (
    <div
      className={`w-[${
        width ? width : '443px'
      }] h-[30px] rounded-[10px] bg-white border border-[#EBEBEC] flex items-center justify-between px-[8px]`}
    >
      <div className="flex items-center justify-center h-full">
        <CustomImage
          src="/svg/searchIcon.svg"
          width={20}
          height={20}
          alt="search icon"
        />
      </div>
      <input
        className="h-full w-full ml-[8px] placeholder-[#EBEBEC] focus:outline-none"
        placeholder="Search"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  )
}

export default CustomSearch
