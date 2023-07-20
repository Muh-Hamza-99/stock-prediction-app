import { IconType } from "react-icons";
import React from "react";

type Props = {
    color: "blue" | "red"
    onClick?: () => void
    icon: IconType
    rounded?: boolean
}

const Icon = ({ color, onClick, icon, rounded=false }: Props) => {
  return (
    <button onClick={onClick} className={`p-1 text-white ${ color === "blue" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600" } ${ rounded ? "rounded-full" : "rounded-md" }`} tabIndex={-1}>
        {React.createElement(icon)}
    </button>
  );
};

export default Icon;