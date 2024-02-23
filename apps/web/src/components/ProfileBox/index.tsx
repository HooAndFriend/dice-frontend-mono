import Image from "next/image";

interface PropsType {
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

const ProfileBox = ({ image, alt, width, height }: PropsType) => {
  return (
    <div>
      {image ? (
        <Image
          src={image}
          width={width ? width : 30}
          height={height ? height : 30}
          alt={alt}
          className={`w-[${width ? width : "30px"}] h-[${
            height ? height : "30px"
          }] rounded-full border-2 border-[#EBEBEC] mr-[10px]`}
        />
      ) : (
        <Image
          src="/images/dice.png"
          width={width ? width : 30}
          height={height ? height : 30}
          alt={alt}
          className={`w-[${width ? width : "30px"}] h-[${
            height ? height : "30px"
          }] rounded-full border-2 border-[#EBEBEC] mr-[10px]`}
        />
      )}
    </div>
  );
};

export default ProfileBox;
