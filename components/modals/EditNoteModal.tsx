"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import useEditNoteModal from "@/hooks/useEditNoteModal";
import { updateNote } from "@/lib/actions/note.actions";
import TextArea from "../inputs/textarea";

const EditNoteModal = () => {
  const editNoteModal = useEditNoteModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: editNoteModal.data.title,
      desc: editNoteModal.data.desc,
    },
  });

  useEffect(() => {
    reset({ title: editNoteModal.data.title, desc: editNoteModal.data.desc });
  }, [editNoteModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await updateNote(data.title, data.desc, editNoteModal.data.id);
      editNoteModal.onClose();
      toast.success("Note Updated Successfully!");
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
        id="title"
        label="title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="desc"
        label="desc"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={editNoteModal.isOpen}
      disabled={isLoading}
      title="Edit Note!"
      actionLabel="Edit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={editNoteModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditNoteModal;
