// ** Component Imports
import {SettingListInfo} from "@/src/type/ticket";
import CustomInput from "../../Input/CustomInput";

interface PropsType {
  item: SettingListInfo;
}

const TicketSettingItem = ({item}: PropsType) => {
  return (
    <div className="flex h-[60px] items-center">
      <div className="flex items-center justify-center">
        <input
          name="color"
          value={item.color}
          type="color"
          className="w-[40px] h-[40px] bg-green-300 rounded-lg"
        />
      </div>
      <div className="px-8">
        <CustomInput
          name="type"
          value={item.type}
          width="165px"
          height="50px"
          borderRadius="10px"
        />
      </div>
      <div>
        <CustomInput
          name="description"
          value={item.description}
          width="1000px"
          height="50px"
          borderRadius="10px"
        />
      </div>
    </div>
  );
};

export default TicketSettingItem;
