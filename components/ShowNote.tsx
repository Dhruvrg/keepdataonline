"use client";

import { Note } from "@prisma/client";
import EmptyState from "./EmptyState";
import NoteCard from "./card/NoteCard";
import useAddNoteModal from "@/hooks/useAddNoteModel";
import AddButton from "./AddButton";

interface ShowNoteProps {
  notes: Note[];
}

const ShowNote: React.FC<ShowNoteProps> = ({ notes }) => {
  const addNoteModal = useAddNoteModal();
  if (notes === undefined || !notes.length) {
    return (
      <>
        <EmptyState />
        <AddButton onClick={addNoteModal.onOpen} />
      </>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-evenly px-[1vw] gap-y-2 py-2 md:gap-y-10 md:py-10">
        {notes?.map((note: any) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            desc={note.desc}
          />
        ))}
      </div>
      <AddButton onClick={addNoteModal.onOpen} />
    </div>
  );
};

export default ShowNote;
