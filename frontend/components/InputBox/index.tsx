import Date from "./Date";
import Dropdown from "./Dropdown";
import ImagePicker from "./ImagePicker";
import Text from "./Text";
import { InputBoxComponentType } from "./types";

const InputBox = Text as InputBoxComponentType;
InputBox.Dropdown = Dropdown;
InputBox.Text = Text;
InputBox.Date = Date;
InputBox.ImagePicker = ImagePicker;

export default InputBox;