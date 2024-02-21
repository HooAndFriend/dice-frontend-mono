interface PropsType {
  image: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

const ProfileBox = ({ image, width, height, borderRadius }: PropsType) => {
  return (
    <img
      src={image}
      width={width ? width : '45px'}
      height={height ? height : '45px'}
      alt="profile"
      className="border rounded-full cursor-pointer"
    />
  )
}

export default ProfileBox
