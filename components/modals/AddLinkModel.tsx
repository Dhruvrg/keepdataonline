"use client";

import useAddLinkModal from "@/hooks/useAddLinkModel";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import { addLink } from "@/lib/actions/link.actions";

const AddLinkModel = () => {
  const addLinkModal = useAddLinkModal();
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
      src: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await addLink(data.name, data.src);
      addLinkModal.onClose();
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
      isOpen={addLinkModal.isOpen}
      disabled={isLoading}
      title="Add Link!"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={addLinkModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddLinkModel;
