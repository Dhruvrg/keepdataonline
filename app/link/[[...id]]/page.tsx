import ClientOnly from "@/components/ClientOnly";
import { fetchLinks } from "@/lib/actions/link.actions";
import ShowLink from "@/components/ShowLink";

interface IParams {
  id?: string;
}

const page = async ({ params }: { params: IParams }) => {
  const links: any = await fetchLinks(params);

  return (
    <ClientOnly>
      <ShowLink links={links} />
    </ClientOnly>
  );
};

export default page;
