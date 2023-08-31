"use client";

import useAddDocumentModal from "@/hooks/useAddDocumentModal";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import Input from "../inputs/input";
import { addDocument } from "@/lib/actions/document.actions";
import supabase from "@/lib/config/supabaseClient";
import DocumentUpload from "../inputs/DocumentUpload";

const AddDocumentModal = () => {
  const pathname = usePathname();
  const addDocumentModal = useAddDocumentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile]: any = useState(null);

  const changeHandler = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

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
      const id = pathname?.split("/")?.reverse()[0];
      if (id === undefined) return;
      const path = `${Date.now()}_${selectedFile.name}`;
      await supabase.storage.from("keepdataonline").upload(path, selectedFile);
      await addDocument(data.name, path, id);
      addDocumentModal.onClose();
      setSelectedFile(null);
      toast.success("Document Added Successfully!");
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
      <DocumentUpload onChange={changeHandler} />
    </div>
  );

  return (
    <Modal
      isOpen={addDocumentModal.isOpen}
      disabled={isLoading}
      title="Add Document!"
      actionLabel="Add"
      onSubmit={handleSubmit(onSubmit)}
      onClose={addDocumentModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddDocumentModal;
