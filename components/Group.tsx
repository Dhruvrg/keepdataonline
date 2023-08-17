"use client";

import useCreateGroupModal from "@/hooks/useCreateGroupModel";
import useSideBarModal from "@/hooks/useSideBarModal";
import { fetchGroups } from "@/lib/actions/group.actions";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import GroupCard from "./card/GroupCard";
import { Group } from "@prisma/client";

const Group = () => {
  const sideBarModal = useSideBarModal();
  const createGroupModal = useCreateGroupModal();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchGroups();
        setGroups(data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    getGroups();
  }, []);

  if (!sideBarModal.isOpen) {
    return;
  }

  return (
    <div className="bg-[#161B21] border-t-[1px] border-gray-800 min-h-[91vh] md:w-[6vw] w-[20vw] flex flex-col items-center">
      {groups?.map((group: any) => (
        <GroupCard
          key={group.id}
          id={group.id}
          name={group.name}
          image={group.image}
        />
      ))}
      <AiOutlinePlusCircle
        onClick={() => createGroupModal.onOpen()}
        className="md:text-[85px] text-[65px] text-gray-700"
      />
    </div>
  );
};

export default Group;
