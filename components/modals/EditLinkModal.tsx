"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import useEditLinkModal from "@/hooks/useEditLinkModel";
import { updateLink } from "@/lib/actions/link.actions";

const EditLinkModal = () => {
  const editLinkModal = useEditLinkModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: editLinkModal.data.name,
      src: editLinkModal.data.src,
    },
  });

  useEffect(() => {
    reset({ name: editLinkModal.data.name, src: editLinkModal.data.src });
  }, [editLinkModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateLink(data.name, data.src, editLinkModal.data.id);
      editLinkModal.onClose();
      toast.success("Link Updated Successfully!");
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
      <Input
        id="src"
        label="src"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={editLinkModal.isOpen}
      disabled={isLoading}
      title="Edit Link!"
      actionLabel="Edit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={editLinkModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditLinkModal;
