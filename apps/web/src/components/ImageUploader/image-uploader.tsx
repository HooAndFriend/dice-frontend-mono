// ** React Imports
import Image from "next/image";
import { ChangeEvent } from "react";
import CustomImage from "../Image/CustomImage";

interface PropsType {
  image: string;
  inputRef: HTMLInputElement | any;
  width?: string;
  height?: string;
  boxColor?: string;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string;
  mode?: "write" | "edit";
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
  mode,
}: PropsType) => {
  return (
    <div>
      {mode === "write" ? (
        <div
          onClick={handleClick}
          style={{
            borderRadius,
            width: width ? width : "100px",
            height: height ? height : "100px",
            border: `solid ${borderWidth} ${borderColor}`,
          }}
          className="flex items-center justify-center cursor-pointer"
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
        </div>
      ) : (
        <div
          className="mt-[14px] relative w-[110px] h-[110px] cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={image}
            alt="Sample Iamge"
            className="w-[104px] h-[104px] rounded-[20px] bg-purple-200 absolute"
          />
          <div className="w-[25px] h-[25px] bg-[#EBEBEC] rounded-[5px] absolute top-[85px] left-[85px] flex justify-center items-center">
            <CustomImage
              src="/svg/edit.svg"
              alt="edit"
              width={15}
              height={15}
            />
          </div>
        </div>
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
