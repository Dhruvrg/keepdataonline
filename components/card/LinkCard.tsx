"use client";

import useEditLinkModal from "@/hooks/useEditLinkModel";
import { deleteLink } from "@/lib/actions/link.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface LinkProps {
  id: string;
  name: string;
  src: string;
}

const LinkCard: React.FC<LinkProps> = ({ id, name, src }) => {
  const router = useRouter();
  const editLinkModal = useEditLinkModal();
  const removeLink = async () => {
    try {
      await deleteLink(id);
      toast.success("Link Deleted Successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const editLink = () => {
    editLinkModal.setData({ id, name, src });
    editLinkModal.onOpen();
  };

  return (
    <div className="md:w-[70vw] w-[96vw] flex bg-[#161B21] mx-[2vw] py-[2vh] px-[2.5vw] rounded-lg border-gray-600 border-[1px]">
      <a href={src} target="_blank">
        <div className="md:w-[50vw] w-[45vw] line-clamp-1">{src}</div>
      </a>
      <div className="text-[#FF0385] mx-[2.5vw] md:w-[7.5vw] w-[30vw] line-clamp-1">
        {name[0]?.toUpperCase() + name?.slice(1)}
      </div>
      <button onClick={removeLink}>
        <AiOutlineDelete className="ml-1 text-xl md:text-2xl" />
      </button>
      <button onClick={editLink}>
        <AiOutlineEdit className="ml-1 text-xl md:text-2xl" />
      </button>
    </div>
  );
};

export default LinkCard;
