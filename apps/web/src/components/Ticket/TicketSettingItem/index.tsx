// ** Component Imports
import {SettingListInfo, SettingQuery} from "@/src/type/ticket";
import CustomInput from "../../Input/CustomInput";
import useInput from "@/src/hooks/useInput";
import {useEffect} from "react";

interface PropsType {
  item: SettingListInfo;
  onUpdate: (updatedItem: SettingListInfo) => void;
}

const TicketSettingItem = ({item, onUpdate}: PropsType) => {
  const {data, handleInput} = useInput({
    id: item.id,
    color: item.color,
    type: item.type,
    description: item.description,

    admin: {
      id: item.admin.id,
    },
    workspace: {
      id: item.workspace.id,
    },
  });

  useEffect(() => {
    onUpdate(data);
  }, [data]);

  return (
    <div className="flex h-[60px] items-center">
      <div className="flex items-center justify-center">
        <input
          name="color"
          value={data.color}
          onChange={handleInput}
          type="color"
          className="w-[40px] h-[40px] bg-green-300 rounded-lg"
        />
      </div>
      <div className="px-8">
        <CustomInput
          name="type"
          value={data.type}
          onChange={handleInput}
          width="165px"
          height="50px"
          borderRadius="10px"
        />
      </div>
      <div>
        <CustomInput
          name="description"
          value={data.description}
          onChange={handleInput}
          width="1000px"
          height="50px"
          borderRadius="10px"
        />
      </div>
    </div>
  );
};

export default TicketSettingItem;
