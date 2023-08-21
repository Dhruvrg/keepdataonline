"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import useSideBarModal from "@/hooks/useSideBarModal";

const Section = () => {
  const pathname = usePathname();
  const sideBarModal = useSideBarModal();
  if (!sideBarModal.isOpen) {
    return;
  }

  return (
    <section className="bg-[#161B21] border-l-[1px] border-t-[1px] border-gray-800 py-1">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname?.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        const id = pathname?.split("/")?.reverse()[0];
        let updatedUrl = link.route + "/" + id;

        if (link.route === "/") {
          updatedUrl = "/";
        }

        return (
          <Link href={updatedUrl} key={link.label}>
            <div
              className={`${
                isActive &&
                "bg-gradient-to-r from-pink-700 to-pink-600 text-black text-lg md:text-xl font-bold md:font-extrabold mx-[1px]"
              } rounded-md duration-200 md:w-[20vw] w-[35vw] md:text-lg text-center md:py-[2.5vh] py-1`}
            >
              <p className="font-bold">{link.label}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Section;
