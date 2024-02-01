// ** Next Imports
import Link from "next/link";
import DashboardIcon from "@/public/svg/dashboard.svg";
import { ReactNode } from "react";

interface PropsType {
  image: string;
  icon: any;
  alt: string;
  link: string;
  width?: string | number;
  height?: string | number;
}

const MenuItem = ({
  image,
  alt,
  width,
  height,
  link,
  icon: Icon,
}: PropsType) => {
  return (
    <Link href={link}>
      <div className="py-5">
        <DashboardIcon
          className="mx-auto"
          style={{ backgroundColor: "#00f" }}
        />
        {/* <img
          src={image}
          width={width ? width : "50px"}
          height={height ? height : "50px"}
          alt={alt}
        /> */}
      </div>
    </Link>
  );
};

export default MenuItem;
