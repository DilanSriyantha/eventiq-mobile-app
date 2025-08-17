import Dropdown from "./Dropdown";
import Text from "./Text";
import { InputBoxComponentType } from "./types";

const InputBox = Text as InputBoxComponentType;
InputBox.Dropdown = Dropdown;

export default InputBox;