interface PropsType {
  title: string
  text: string
}

const TitleBox = ({ title, text }: PropsType) => {
  return (
    <div className="h-[120px] w-full bg-white rounded-[10px] py-4 px-8">
      <h1 className="text-[16px]">{title}</h1>
      <h1 className="font-bold text-[24px] mt-4">{text}</h1>
    </div>
  )
}

export default TitleBox
