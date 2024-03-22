"use client";

import { useEffect, useRef, useState } from "react";

interface PropsType {
  profile: string;
  nickname: string;
  width?: string | number;
  height?: string | number;
}

const QaUserButton = ({ profile, nickname, width, height }: PropsType) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <div className="relative">
      <div
        className="flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <img
          className="rounded-full border border-[#EBEBEC] mr-[10px] "
          src={profile}
          width={width ? width : 30}
          height={height ? height : 30}
        />
        <div className="font-spoqa">{nickname}</div>
      </div>
      {open && (
        <div
          className="absolute w-[200px] h-[150px] bg-slate-200 top-[50px] left-0 rounded-lg overflow-y-auto z-10"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-center w-full px-2 py-2">
            <input type="text" className="w-full h-8 rounded-md" />
          </div>
          <div className="flex items-center px-4 py-2 mt-2 hover:bg-slate-300">
            <img
              className="rounded-full border border-[#EBEBEC] mr-[10px] "
              src={profile}
              width={30}
              height={30}
            />
            <div className="font-spoqa">{nickname}</div>
          </div>
          <div className="flex items-center px-4 py-2 mt-2 hover:bg-slate-300">
            <img
              className="rounded-full border border-[#EBEBEC] mr-[10px] "
              src={profile}
              width={30}
              height={30}
            />
            <div className="font-spoqa">{nickname}</div>
          </div>
          <div className="flex items-center px-4 py-2 mt-2 hover:bg-slate-300">
            <img
              className="rounded-full border border-[#EBEBEC] mr-[10px] "
              src={profile}
              width={30}
              height={30}
            />
            <div className="font-spoqa">{nickname}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QaUserButton;
