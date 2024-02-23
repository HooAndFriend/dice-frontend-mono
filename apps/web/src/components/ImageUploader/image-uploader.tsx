// ** React Imports
import { ChangeEvent } from "react";

interface PropsType {
  image: string;
  inputRef: HTMLInputElement | any;
  width?: string;
  height?: string;
  boxColor?: string;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}
const ImageUploaderView = ({
  image,
  width,
  height,
  boxColor,
  borderRadius,
  handleClick,
  inputRef,
  handleImageChange,
  borderColor,
  borderWidth,
}: PropsType) => {
  return (
    <div
      onClick={handleClick}
      style={{
        borderRadius,
        width: width ? width : "100px",
        height: height ? height : "100px",
        border: `solid ${borderWidth} ${borderColor}`,
      }}
      className="flex items-center justify-center"
    >
      {image !== "" ? (
        <img
          src={image}
          alt="Preview"
          style={{ width: "100%", height: "100%", borderRadius }}
        />
      ) : (
        <div
          style={{
            width: "90%",
            height: "90%",
            backgroundColor: boxColor ? boxColor : "",
            borderRadius,
          }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploaderView;
