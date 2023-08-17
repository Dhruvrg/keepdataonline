"use client";

import { Link } from "@prisma/client";

interface LinkClientProps {
  links: Link[];
}

const LinkClient: React.FC<LinkClientProps> = ({ links }) => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default LinkClient;
