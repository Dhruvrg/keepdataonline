"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function addLink(name: string, src: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("You need to Login");
    }
    await prisma.link.create({
      data: {
        name,
        src,
        userId: currentUser?.id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to add link: ${error.message}`);
  }
}

export async function fetchLinks() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("You need to Login");
    }
    const links = await prisma.link.findMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return links;
  } catch (error: any) {
    throw new Error(`Failed to fetch links: ${error.message}`);
  }
}
