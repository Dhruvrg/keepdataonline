"use client";

import { fetchGroups } from "@/lib/actions/group.actions";
import { Group } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import GroupDetailsCard from "./card/GroupDetailsCard";

const GroupDetails = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data: any = await fetchGroups();
        setGroups(data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };
    getGroups();
  }, []);

  return (
    <div className="md:w-[44vw] p-1 flex flex-col gap-1">
      {groups?.map((group: any) => (
        <GroupDetailsCard
          key={group.id}
          id={group.id}
          name={group.name}
          image={group.image}
        />
      ))}
    </div>
  );
};

export default GroupDetails;
