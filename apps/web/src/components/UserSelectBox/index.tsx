// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Component Imports
import CustomImage from "../Image/CustomImage";

// ** Service Imports
import { Get } from "@/src/repository";
import useSWR from "swr";

// && Type Imports
import {
  GetSearchWorkspaceUserListResponse,
  WorkspaceUser,
} from "@/src/type/workspace";

interface PropsType {
  checkedList: WorkspaceUser[];
  setCheckedList: (checkedList: WorkspaceUser[]) => void;
}

const UserSelectBox = ({ checkedList, setCheckedList }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data, error, isLoading } = useSWR(
    "/v1/workspace-user/search",
    async (url) => {
      return Get<GetSearchWorkspaceUserListResponse>(url);
    }
  );

  const handleOpen = () => {
    setOpen((c) => !c);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        handleOpen();
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  if (error || isLoading) return;

  return (
    <div className="relative z-4">
      <div
        className="w-[187px] h-[30px] flex relative"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {checkedList.slice(0, 3).map((item) => (
          <CustomImage
            src={item.teamUser.user.profile}
            key={item.id}
            alt="Sample Image"
            className="rounded-full"
            width={30}
            height={30}
          />
        ))}
        <img
          src="/svg/dot.svg"
          alt="Sample Image"
          className="bg-white w-[29] h-[29] rounded-full"
        />
      </div>
      {open && (
        <div
          className="absolute w-[184px] h-[230px] top-[50px] left-0 bg-white shadow-lg rounded-lg overflow-y-auto z-30"
          ref={dropdownRef}
        >
          {data.data.data.map((item) => (
            <div className="flex items-center justify-center px-[5px] py-[8px]">
              <div
                className="w-[168px] cursor-pointer h-[32px] py-[10px] rounded-[8px] px-[8px] flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                key={item.id}
              >
                <input
                  type="checkbox"
                  className="mr-[13px]"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckedList([...checkedList, item]);
                    } else {
                      setCheckedList([
                        ...checkedList.filter((_) => _.id !== item.id),
                      ]);
                    }
                  }}
                  checked={checkedList.some((_) => _.id === item.id)}
                />
                <CustomImage
                  className="rounded-full border border-[#EBEBEC]"
                  src={
                    item.teamUser.user.profile
                      ? item.teamUser.user.profile
                      : "/images/dice.png"
                  }
                  alt="profile"
                  width={30}
                  height={30}
                />
                <p className="text-[12px] ml-[13px]">
                  {item.teamUser.user.nickname}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSelectBox;
