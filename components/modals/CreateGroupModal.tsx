"use client";

import useCreateGroupModal from "@/hooks/useCreateGroupModel";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import { createGroup } from "@/lib/actions/group.actions";

const CreateModal = () => {
  const createGroupModal = useCreateGroupModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await createGroup(data.name);
      createGroupModal.onClose();
      toast.success("Group created!");
      router.refresh();
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <Input
      id="name"
      label="name"
      disabled={isLoading}
      register={register}
      errors={errors}
      required
    />
  );

  return (
    <Modal
      isOpen={createGroupModal.isOpen}
      disabled={isLoading}
      title="Create Group!"
      actionLabel="Create"
      onSubmit={handleSubmit(onSubmit)}
      onClose={createGroupModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateModal;
