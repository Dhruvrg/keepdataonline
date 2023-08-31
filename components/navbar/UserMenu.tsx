"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { SafeUser } from "@/types";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <>
      {currentUser ? (
        <div onClick={toggleOpen} className="flex items-center gap-2">
          <Avatar src={currentUser?.image} />
          <p className="hidden md:block">{currentUser?.name}</p>
        </div>
      ) : (
        <>
          <AiOutlineMenu onClick={toggleOpen} className="md:hidden text-2xl" />
          <div className="hidden gap-2 md:flex">
            <MenuItem label="Login" onClick={loginModal.onOpen} />
            <MenuItem label="SignUp" onClick={registerModal.onOpen} />
          </div>
        </>
      )}
      {isOpen && (
        <>
          {currentUser ? (
            <div className="absolute bg-gray-800 rounded-md mt-[5vh] right-4 md:right-32 flex flex-col items-center">
              <MenuItem
                label="Logout"
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              />
            </div>
          ) : (
            <div className="md:hidden absolute bg-gray-800 rounded-md mt-[5vh] right-4 flex flex-col items-center">
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <MenuItem label="SignUp" onClick={registerModal.onOpen} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserMenu;
