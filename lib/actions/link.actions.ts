"use server";

import prisma from "@/lib/prismadb";

interface IParams {
  id?: string;
}

export async function addLink(name: string, src: string, id: string) {
  try {
    if (id === undefined) return;
    await prisma.link.create({
      data: {
        name,
        src,
        groupId: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to add link: ${error.message}`);
  }
}

export async function fetchLinks(params: IParams) {
  try {
    const { id } = params;
    if (id === undefined) return;
    const links = await prisma.link.findMany({
      where: {
        groupId: id[0],
      },
    });
    return links;
  } catch (error: any) {
    throw new Error(`Failed to fetch links: ${error.message}`);
  }
}

export async function deleteLink(id: string) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    await prisma.link.deleteMany({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete link: ${error.message}`);
  }
}

export async function updateLink(name: string, src: string, id: string) {
  try {
    await prisma.link.update({
      where: { id: id },
      data: { name, src },
    });
  } catch (error: any) {
    throw new Error(`Failed to update link: ${error.message}`);
  }
}
