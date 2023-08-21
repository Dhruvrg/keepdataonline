"use client";

import Image from "next/image";
import Button from "./Button";
import useEditUserModal from "@/hooks/useEditUserModel";

interface UserProps {
  name: string | null;
  email: string | null;
  image: string | null;
}
const UserDetails: React.FC<UserProps> = ({ name, email, image }) => {
  const editUserModal = useEditUserModal();

  return (
    <div className="md:w-[30vw] w-[100vw] md:h-[91vh] p-4 border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-600">
      <div>
        <Image
          className="rounded-full w-[85vw] md:w-[25vw] m-auto"
          height="100"
          width="100"
          alt="Avatar"
          src={image || "/images/placeholder.jpg"}
        />
      </div>
      <div className="font-extrabold text-3xl">{name}</div>
      <div className="text-xl text-gray-500 mb-5">{email}</div>
      <Button label="Edit profile" onClick={editUserModal.onOpen} />
    </div>
  );
};

export default UserDetails;
