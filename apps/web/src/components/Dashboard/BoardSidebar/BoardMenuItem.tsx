// ** Next Imports
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// ** React Imports
import { useState } from "react";

// ** Type Imports
import { BoardInfo } from "@/src/type/board";

// ** Component Imports
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  data: BoardInfo;
}

const BoardMenuItem = ({ data }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const path = usePathname();

  return (
    <div>
      <div className="flex items-center mb-2" key={data.id}>
        {data.children.length > 0 ? (
          <CustomImage
            src={open ? "/svg/arrow-up.svg" : "/svg/arrow-down.svg"}
            alt="arrow"
            className="pb-1 cursor-pointer"
            width={12}
            height={12}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <div className="w-[12px] h-[12px] pl-1 pt-1">
            <div className="w-[5px] h-[5px] bg-black rounded-full" />
          </div>
        )}
        {data.children.length > 0 ? (
          <p className="ml-2">{data.title}</p>
        ) : (
          <Link href={`/dashboard/board/${data.id}`}>
            <p
              className={`ml-2 ${
                path.split("/")[3] === String(data.id) && "text-blue-500"
              }`}
            >
              {data.title}
            </p>
          </Link>
        )}
      </div>
      {open && (
        <div>
          {data.children.map((_) => (
            <div className="flex items-center mb-2 ml-4" key={_.id}>
              <div className="w-[12px] h-[12px] pl-1 pt-1">
                <div className="w-[5px] h-[5px] bg-black rounded-full" />
              </div>
              <Link href={`/dashboard/board/${_.id}`}>
                <p
                  className={`ml-2 ${
                    path.split("/")[3] === String(_.id) && "text-blue-500"
                  }`}
                >
                  {data.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardMenuItem;
