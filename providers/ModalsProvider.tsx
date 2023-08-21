"use client";

import AddLinkModal from "@/components/modals/AddLinkModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import AddNoteModal from "@/components/modals/AddNoteModal";
import EditUserModel from "@/components/modals/EditUserModel";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import { SafeUser } from "@/types";

interface ModalsProviderProps {
  currentUser?: SafeUser | null;
}

const ModalsProvider: React.FC<ModalsProviderProps> = ({ currentUser }) => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CreateGroupModal />
      <AddLinkModal />
      <AddNoteModal />
      <EditUserModel currentUser={currentUser} />
    </>
  );
};

export default ModalsProvider;
