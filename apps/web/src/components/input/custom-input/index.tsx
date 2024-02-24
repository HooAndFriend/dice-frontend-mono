// ** Component Imports
import CustomInputView from "./custom-input";

interface PropsType {
  placeholder?: string;
}

const CustomInput = ({ placeholder }: PropsType) => {
  return <CustomInputView placeholder={placeholder} />;
};

export default CustomInput;
