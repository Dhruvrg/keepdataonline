import GroupDetails from "@/components/GroupDetails";
import UserDetails from "@/components/UserDetails";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import React from "react";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser === null) return;

  return (
    <div className="md:flex">
      <UserDetails
        name={currentUser?.name}
        email={currentUser?.email}
        image={currentUser?.image}
      />
      <GroupDetails />
    </div>
  );
};

export default page;
