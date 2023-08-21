"use client";

import { useState } from "react";
import ImageUpload from "../inputs/ImageUpload";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "../inputs/input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useEditUserModal from "@/hooks/useEditUserModel";
import { updateUser } from "@/lib/actions/user.actions";

import { SafeUser } from "@/types";

interface EditUserModelProps {
  currentUser?: SafeUser | null;
}

const EditUserModel: React.FC<EditUserModelProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const editUserModal = useEditUserModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateUser(data.name, data.image);
      editUserModal.onClose();
      toast.success("Profile Edited Successfully!");
      router.refresh();
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-5">
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <ImageUpload
        onChange={(value) => setCustomValue("image", value)}
        value={image}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editUserModal.isOpen}
      title="Update Profile!"
      actionLabel="Updated"
      onSubmit={handleSubmit(onSubmit)}
      onClose={editUserModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditUserModel;
