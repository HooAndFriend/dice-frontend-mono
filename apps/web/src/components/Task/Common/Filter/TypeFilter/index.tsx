"use client";

// ** React Imports
import { useEffect, useRef, useState, ChangeEvent } from "react";

// ** Swr Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetTicketSettingListResponse } from "@/src/type/ticket";
import { getTicketSettingImage } from "@/src/utils/ticket-setting";

// ** Component Imports
import CustomImage from "../../../../Image/CustomImage";

interface PropsType {
  selectedTypeIds: number[];
  handleTypeSelectFilter: (id: number) => void;
}

const TypeFilter = ({ selectedTypeIds, handleTypeSelectFilter }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { data, error, isLoading } = useSWR("/v1/ticket/setting", async (url) =>
    Get<GetTicketSettingListResponse>(url)
  );

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
        className="flex items-center cursor-pointer w-[120px] h-[50px] justify-between px-[15px]"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <h1>TYPE</h1>
        <div className="ml-[5px] w-[25px] h-[25px] rounded-full bg-[#623AD6] flex items-center justify-center text-white">
          {selectedTypeIds.length}
        </div>
        <img src="/svg/arrow-down.svg" alt="arrow" />
      </div>
      {open && (
        <div
          className="absolute w-[302px] h-[200px] bg-white shadow-lg top-[50px] left-0 rounded-lg overflow-y-auto z-10 overflow-x-hidden"
          ref={dropdownRef}
        >
          <div className="flex items-center justify-center w-full px-2 py-2">
            <input
              type="text"
              className="w-full h-8 border-none focus:outline-none"
              value={name}
              onChange={handleName}
              placeholder="Search.."
            />
          </div>
          <hr className="w-full" />
          <div className="px-[8px] py-[8px]">
            {isLoading
              ? []
              : data.data.data
                  .filter((item) =>
                    item.name.toLowerCase().includes(name.toLowerCase())
                  )
                  .map((item) => (
                    <div className="flex items-center mb-4" key={item.id}>
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        checked={selectedTypeIds.includes(item.id)}
                        onChange={() => handleTypeSelectFilter(item.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="flex items-center text-sm font-medium text-gray-900 ms-2 dark:text-gray-300"
                      >
                        <div
                          className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
                          style={{
                            backgroundColor: getTicketSettingImage(item.type)
                              .color,
                          }}
                        >
                          <CustomImage
                            src={getTicketSettingImage(item.type).url}
                            alt="ticket_setting"
                            width={16}
                            height={16}
                          />
                        </div>
                        <p className="text-[12px] ml-[13px]">{item.name}</p>
                      </label>
                    </div>
                  ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeFilter;
