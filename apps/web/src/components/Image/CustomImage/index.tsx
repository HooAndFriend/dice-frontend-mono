import Image from "next/image";

interface PropsType {
  width: number;
  height: number;
  alt: string;
  src: string;
  className?: string;
  onClick?: () => void;
}

const CustomImage = ({
  width,
  height,
  alt,
  src,
  className,
  onClick,
}: PropsType) => {
  return (
    <img
      alt={alt}
      width={width}
      height={height}
      className={className}
      src={src}
      onClick={onClick ? onClick : () => {}}
    />
  );
  return process.env.NODE_ENV === "development" ? (
    <Image
      alt={alt}
      width={width}
      height={height}
      className={className}
      src={src}
      onClick={onClick ? onClick : () => {}}
    />
  ) : (
    <img
      alt={alt}
      width={width}
      height={height}
      className={className}
      src={src}
      onClick={onClick ? onClick : () => {}}
    />
  );
};

export default CustomImage;
