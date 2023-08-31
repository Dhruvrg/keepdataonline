"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import { updateDocument } from "@/lib/actions/document.actions";
import useEditDocumentModal from "@/hooks/useEditDocumentModal";

const EditDocumentModal = () => {
  const editDocumentModal = useEditDocumentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: editDocumentModal.data.name,
    },
  });

  useEffect(() => {
    reset({ name: editDocumentModal.data.name });
  }, [editDocumentModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateDocument(data.name, editDocumentModal.data.id);
      editDocumentModal.onClose();
      toast.success("Document Updated Successfully!");
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
      isOpen={editDocumentModal.isOpen}
      disabled={isLoading}
      title="Edit Document!"
      actionLabel="Edit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={editDocumentModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditDocumentModal;
