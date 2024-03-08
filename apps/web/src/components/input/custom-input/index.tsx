// ** Component Imports
import CustomInputView from "./custom-input";

interface PropsType {
  placeholder?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const CustomInput = (props: PropsType) => {
  return <CustomInputView {...props} />;
};

export default CustomInput;
