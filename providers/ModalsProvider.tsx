"use client";

import AddLinkModal from "@/components/modals/AddLinkModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import AddNoteModal from "@/components/modals/AddNoteModal";
import EditUserModel from "@/components/modals/EditUserModel";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import { SafeUser } from "@/types";
import EditLinkModal from "@/components/modals/EditLinkModal";
import EditNoteModal from "@/components/modals/EditNoteModal";
import EditGroupModal from "@/components/modals/EditGroupModal";

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
      <EditLinkModal />
      <EditNoteModal />
      <EditGroupModal />
    </>
  );
};

export default ModalsProvider;
