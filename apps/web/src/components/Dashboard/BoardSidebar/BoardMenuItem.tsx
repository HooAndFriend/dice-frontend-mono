// ** Next Imports
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  const { get } = useSearchParams();

  return (
    <div>
      <div className="flex items-center mb-2" key={data.boardId}>
        {data.children.length > 0 ? (
          <CustomImage
            src={open ? "/svg/arrow-down.svg" : "/svg/arrow-up.svg"}
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
          <Link href={`/dashboard/board?boardId=${data.boardId}`}>
            <p
              className={`ml-2 ${
                get("boardId") === String(data.boardId) && "text-blue-500"
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
            <div className="flex items-center mb-2 ml-4" key={_.boardId}>
              <div className="w-[12px] h-[12px] pl-1 pt-1">
                <div className="w-[5px] h-[5px] bg-black rounded-full" />
              </div>
              <Link href={`/dashboard/board?boardId=${_.boardId}`}>
                <p
                  className={`ml-2 ${
                    get("boardId") === String(_.boardId) && "text-blue-500"
                  }`}
                >
                  {_.title}
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
