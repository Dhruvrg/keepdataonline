"use client";

import useEditGroupModal from "@/hooks/useEditGroupModal";
import { deleteGroup } from "@/lib/actions/group.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface GroupProps {
  id: string;
  name: string;
  image: string;
}

const GroupDetailsCard: React.FC<GroupProps> = ({ id, name, image }) => {
  const router = useRouter();
  const editGroupModal = useEditGroupModal();

  const removeGroup = async () => {
    try {
      await deleteGroup(id);
      toast.success("Group Deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const editGroup = () => {
    editGroupModal.setData({ id, name, image });
    editGroupModal.onOpen();
  };

  return (
    <div className="flex items-center border-[1px] border-gray-600 p-2 rounded-lg">
      <div className="flex items-center gap-5 flex-1">
        <Image
          height="100"
          width="100"
          alt="Avatar"
          className="rounded-full w-[14vw] h-[14vw] md:w-[4.6vw] md:h-[4.6vw]"
          src={image || "/images/placeholder.jpg"}
        />
        <div className="font-bold text-lg">{name}</div>
      </div>
      <button onClick={editGroup}>
        <AiOutlineEdit className="mx-4 text-2xl md:text-3xl" />
      </button>
      <button onClick={removeGroup}>
        <AiOutlineDelete className="mx-4 text-2xl md:text-3xl" />
      </button>
    </div>
  );
};

export default GroupDetailsCard;
