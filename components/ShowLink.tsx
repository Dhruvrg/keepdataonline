"use client";

import { Link } from "@prisma/client";
import EmptyState from "./EmptyState";
import LinkCard from "./card/LinkCard";
import useAddLinkModal from "@/hooks/useAddLinkModel";
import AddButton from "./AddButton";

interface ShowLinkProps {
  links: Link[];
}

const ShowLink: React.FC<ShowLinkProps> = ({ links }) => {
  const addLinkModal = useAddLinkModal();
  if (links === undefined || !links.length) {
    return (
      <>
        <EmptyState />
        <AddButton onClick={addLinkModal.onOpen} />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col md:gap-4 gap-2 md:py-4 py-2">
        {links?.map((link: any) => (
          <LinkCard
            key={link.id}
            id={link.id}
            name={link.name}
            src={link.src}
          />
        ))}
      </div>
      <AddButton onClick={addLinkModal.onOpen} />
    </>
  );
};

export default ShowLink;
