import Link from "next/link";

interface PropsType {
  image: string;
  alt: string;
  link: string;
  width?: string | number;
  height?: string | number;
}

const MenuItem = ({ image, alt, width, height, link }: PropsType) => {
  return (
    <Link href={link}>
      <div className="py-3">
        <img
          src={image}
          width={width ? width : "50px"}
          height={height ? height : "50px"}
          alt={alt}
        />
      </div>
    </Link>
  );
};

export default MenuItem;
