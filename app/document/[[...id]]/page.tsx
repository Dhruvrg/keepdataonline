import ClientOnly from "@/components/ClientOnly";
import { fetchDocuments } from "@/lib/actions/document.actions";
import ShowDocument from "@/components/ShowDocument";

interface IParams {
  id?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const Documents: any = await fetchDocuments(params);

  return (
    <ClientOnly>
      <ShowDocument documents={Documents} />
    </ClientOnly>
  );
};

export default page;
