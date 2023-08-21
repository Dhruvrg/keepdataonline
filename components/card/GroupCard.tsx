"use client";

import Image from "next/image";
import Link from "next/link";

interface GroupProps {
  id: string;
  name: string;
  image: string;
}

const GroupCard: React.FC<GroupProps> = ({ id, name, image }) => {
  const upadateId = "http://localhost:3000/document/" + id;
  return (
    <Link href={upadateId}>
      <div>
        <div className="mt-1 flex justify-center items-center rounded-full w-[15vw] h-[15vw] md:w-[5vw] md:h-[5vw] bg-gradient-to-r from-purple-800 via-purple-500 to-pink-500">
          {image.length === 0 ? (
            <div className="bg-[#161B21] rounded-full w-[14vw] h-[14vw] md:w-[4.6vw] md:h-[4.6vw] flex justify-center items-center overflow-hidden text-sm font-thin">
              {name.split(" ")[0]}
            </div>
          ) : (
            <div className="bg-[#161B21] rounded-full w-[14vw] h-[14vw] md:w-[4.6vw] md:h-[4.6vw] flex justify-center items-center">
              <Image
                height="100"
                width="100"
                alt="Avatar"
                className="rounded-full w-[14vw] h-[14vw] md:w-[4.6vw] md:h-[4.6vw]"
                src={image}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
