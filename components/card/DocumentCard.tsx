"use client";

import useEditDocumentModal from "@/hooks/useEditDocumentModal";
import { deleteDocument } from "@/lib/actions/document.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillCopy,
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";

interface DocumentProps {
  id: string;
  name: string;
  src: string;
}

const DocumentCard: React.FC<DocumentProps> = ({ id, name, src }) => {
  const link = `https://iqznnprlynrxnwrhvhor.supabase.co/storage/v1/object/public/keepdataonline/${src}`;
  const editDocumentModal = useEditDocumentModal();
  const [copied, setCopied] = useState("");
  const router = useRouter();

  const handleCopy = () => {
    setCopied(link);
    navigator.clipboard.writeText(link);
    toast.success("URL Copied!");
    setTimeout(() => setCopied(""), 3000);
  };

  const removeDocument = async () => {
    try {
      await deleteDocument(id);
      toast.success("Document Deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const editDocument = () => {
    editDocumentModal.setData({ id, name, src });
    editDocumentModal.onOpen();
  };

  return (
    <div className="w-[96vw] md:block flex flex-row-reverse md:w-[12.5vw] md:h-[12.5vw] bg-[#161B21] border-[2px] border-gray-600 rounded-lg py-2">
      <div className="flex md:justify-center gap-2 justify-end px-2">
        <a target="_blank" href={link}>
          <AiOutlineEye className="ml-2 text-xl md:text-2xl" />
        </a>
        <button onClick={removeDocument}>
          <AiOutlineDelete className="ml-2 text-xl md:text-2xl" />
        </button>
        <button onClick={editDocument}>
          <AiOutlineEdit className="ml-2 text-xl md:text-2xl" />
        </button>
        <button onClick={handleCopy}>
          {copied === link ? (
            <AiFillCopy className="ml-2 text-xl md:text-2xl text-green-500" />
          ) : (
            <AiOutlineCopy className="ml-2 text-xl md:text-2xl" />
          )}
        </button>
      </div>
      <span className="md:flex hidden items-center justify-center h-[8.5vw] font-bold">
        {src.split(".")?.reverse()[0].toUpperCase()}
      </span>
      <span className="flex-1 px-1 line-clamp-1 font-semibold text-lg">
        {name}
      </span>
    </div>
  );
};

export default DocumentCard;
