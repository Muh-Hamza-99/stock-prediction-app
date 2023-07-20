import { FaTimes } from "react-icons/fa";
import Icon from "./Icon";

type Props = {
    title: string
    description: string
    onClose: () => void
};

const ModalHeader = ({ title, description, onClose }: Props) => {
  return (
    <div className="w-full flex justify-between items-start">
        <div>
            <h4 className="text-xl font-bold">{title}</h4>
            <span className="text-gray-500 italic">{description}</span>
        </div>
        <Icon onClick={onClose} color="red" icon={ FaTimes } rounded />
    </div>
  );
};

export default ModalHeader;