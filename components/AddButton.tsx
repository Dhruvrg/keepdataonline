"use client";

import { AiOutlinePlusCircle } from "react-icons/ai";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="fixed bottom-2 md:bottom-5 right-2">
      <AiOutlinePlusCircle className="md:text-[85px] text-[65px] text-gray-500" />
    </button>
  );
};

export default AddButton;
