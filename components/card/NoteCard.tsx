"use client";

import { deleteNote } from "@/lib/actions/note.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCopy,
  AiFillCopy,
} from "react-icons/ai";

interface NoteProps {
  id: string;
  title: string;
  desc: string;
}

const NoteCard: React.FC<NoteProps> = ({ id, title, desc }) => {
  const [copied, setCopied] = useState("");
  const router = useRouter();

  const handleCopy = () => {
    setCopied(desc);
    navigator.clipboard.writeText(desc);
    toast.success("Text Copied!");
    setTimeout(() => setCopied(""), 3000);
  };

  const removeNote = async () => {
    try {
      await deleteNote(id);
      toast.success("Note Deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const editNote = async () => {
    try {
      // await editLink(id,title,desc);
      toast.success("Note Updated Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="md:w-[32vw] w-[98vw] md:h-[20vh] h-[30vw] p-2 overflow-hidden bg-[#161B21] rounded-lg border-gray-600 border-[1px]">
      <div className="flex">
        <span className="font-semibold text-pink-600 flex-1">{title}</span>
        <button onClick={removeNote}>
          <AiOutlineDelete className="ml-2 text-xl md:text-2xl" />
        </button>
        <button onClick={editNote}>
          <AiOutlineEdit className="ml-2 text-xl md:text-2xl" />
        </button>
        <button onClick={handleCopy}>
          {copied === desc ? (
            <AiFillCopy className="ml-2 text-xl md:text-2xl text-green-500" />
          ) : (
            <AiOutlineCopy className="ml-2 text-xl md:text-2xl" />
          )}
        </button>
      </div>
      <div className="text-gray-400 md:line-clamp-4 line-clamp-2 mt-1">
        {desc}
      </div>
    </div>
  );
};

export default NoteCard;
