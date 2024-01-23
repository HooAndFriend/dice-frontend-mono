interface PropsType {
  image: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

const ProfileBox = ({ image, alt, width, height }: PropsType) => {
  return (
    <div>
      <img
        src={image}
        width={width ? width : "30px"}
        height={height ? height : "30px"}
        alt={alt}
        className="rounded-full border-2 border-[#EBEBEC] mr-[10px]"
      />
    </div>
  );
};

export default ProfileBox;
