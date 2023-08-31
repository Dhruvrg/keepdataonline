"use client";

import { Document } from "@prisma/client";
import EmptyState from "./EmptyState";
import DocumentCard from "./card/DocumentCard";
import useAddDocumentModal from "@/hooks/useAddDocumentModal";
import AddButton from "./AddButton";

interface ShowDocumentProps {
  documents: Document[];
}

const ShowDocument: React.FC<ShowDocumentProps> = ({ documents }) => {
  const addDocumentModal = useAddDocumentModal();
  if (documents === undefined || !documents.length) {
    return (
      <>
        <EmptyState />
        <AddButton onClick={addDocumentModal.onOpen} />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-evenly px-2 gap-y-2 py-2 md:gap-10 md:px-10 md:py-10">
        {documents?.map((document: any) => (
          <DocumentCard
            key={document.id}
            id={document.id}
            name={document.name}
            src={document.src}
          />
        ))}
      </div>
      <AddButton onClick={addDocumentModal.onOpen} />
    </>
  );
};

export default ShowDocument;
