// ** Component Imports
import CustomSelectView from "./custom-select";

interface PropsType {
  option: string;
}

const CustomSelect = ({option}: PropsType) => {
  return <CustomSelectView option={option} />;
};

export default CustomSelect;
