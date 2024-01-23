interface PropsType {
  image: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

const MenuItem = ({ image, alt, width, height }: PropsType) => {
  return (
    <div className="py-3">
      <img
        src={image}
        width={width ? width : "50px"}
        height={height ? height : "50px"}
        alt={alt}
      />
    </div>
  );
};

export default MenuItem;
