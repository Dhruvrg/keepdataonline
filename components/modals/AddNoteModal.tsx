"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import { addNote } from "@/lib/actions/note.actions";
import useAddNoteModal from "@/hooks/useAddNoteModel";
import TextArea from "../inputs/textarea";

const AddNoteModal = () => {
  const pathname = usePathname();
  const addNoteModal = useAddNoteModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const id = pathname?.split("/")?.reverse()[0];
      if (id === undefined) return;
      await addNote(data.title, data.desc, id);
      addNoteModal.onClose();
      toast.success("Note Added Successfully!");
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
      isOpen={addNoteModal.isOpen}
      disabled={isLoading}
      title="Add Note!"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={addNoteModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddNoteModal;
