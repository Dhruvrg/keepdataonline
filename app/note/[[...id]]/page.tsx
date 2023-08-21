import ClientOnly from "@/components/ClientOnly";
import { fetchNotes } from "@/lib/actions/note.actions";
import ShowNote from "@/components/ShowNote";

interface IParams {
  id?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const notes: any = await fetchNotes(params);
  return (
    <ClientOnly>
      <ShowNote notes={notes} />
    </ClientOnly>
  );
};

export default page;
