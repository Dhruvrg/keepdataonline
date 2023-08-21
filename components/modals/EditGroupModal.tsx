"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import useEditGroupModal from "@/hooks/useEditGroupModal";
import { updateGroup } from "@/lib/actions/group.actions";
import ImageUpload from "../inputs/ImageUpload";

const EditGroupModal = () => {
  const editGroupModal = useEditGroupModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: editGroupModal.data.name,
      image: editGroupModal.data.image,
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

  useEffect(() => {
    reset({ name: editGroupModal.data.name, image: editGroupModal.data.image });
  }, [editGroupModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateGroup(data.name, data.image, editGroupModal.data.id);
      editGroupModal.onClose();
      toast.success("Group Updated Successfully!");
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
      isOpen={editGroupModal.isOpen}
      disabled={isLoading}
      title="Edit Group!"
      actionLabel="Edit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={editGroupModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditGroupModal;
