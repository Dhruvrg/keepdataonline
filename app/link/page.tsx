import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import LinkClient from "./LinkClient";
import { fetchLinks } from "@/lib/actions/link.actions";
import useAddLinkModal from "@/hooks/useAddLinkModel";
import { AiOutlinePlusCircle } from "react-icons/ai";

const page = async () => {
  // const addLinkModal = useAddLinkModal();
  const links = await fetchLinks();

  if (!links.length) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <LinkClient links={links} />
      {/* <AiOutlinePlusCircle
        onClick={() => addLinkModal.onOpen()}
        className="absolute bottom-0 right-0 md:text-[85px] text-[65px] text-white"
      /> */}
    </ClientOnly>
  );
};

export default page;
