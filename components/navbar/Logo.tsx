"use client";

import useSideBarModal from "@/hooks/useSideBarModal";
import { AiOutlineDatabase } from "react-icons/ai";

const Logo = () => {
  const sideBarModal = useSideBarModal();

  const toggleOpen = () => {
    if (sideBarModal.isOpen && window.innerWidth < 768) {
      sideBarModal.onClose();
    } else {
      sideBarModal.onOpen();
    }
  };

  return (
    <div
      onClick={toggleOpen}
      className="flex gap-1 items-center md:text-xl md:font-extrabold font-bold cursor-pointer bg-gradient-to-r from-purple-900 via-pink-500 to-white text-transparent bg-clip-text bg-300% animate-gradient hover:scale-105 duration-500"
    >
      <div className="bg-pink-500 rounded-full p-1">
        <AiOutlineDatabase className="text-black text-2xl" />
      </div>
      <p className="text-xl">KeepDataOnline</p>
    </div>
  );
};

export default Logo;
