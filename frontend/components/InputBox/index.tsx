import Dropdown from "./Dropdown";
import Text from "./Text";
import { InputBoxComponentType } from "./types";

const InputBox = Text as InputBoxComponentType;
InputBox.Dropdown = Dropdown;
InputBox.Text = Text;

export default InputBox;