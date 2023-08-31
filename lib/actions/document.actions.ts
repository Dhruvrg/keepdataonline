"use server";

import prisma from "@/lib/prismadb";

interface IParams {
  id?: string;
}

export async function addDocument(name: string, src: string, id: string) {
  try {
    if (id === undefined) return;
    await prisma.document.create({
      data: {
        name,
        src,
        groupId: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to add document: ${error.message}`);
  }
}

export async function fetchDocuments(params: IParams) {
  try {
    const { id } = params;
    if (id === undefined) return;
    const documents = await prisma.document.findMany({
      where: {
        groupId: id[0],
      },
    });
    return documents;
  } catch (error: any) {
    throw new Error(`Failed to fetch documents: ${error.message}`);
  }
}

export async function deleteDocument(id: string) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    await prisma.document.deleteMany({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete document: ${error.message}`);
  }
}

export async function updateDocument(name: string, id: string) {
  try {
    await prisma.document.update({
      where: { id: id },
      data: { name },
    });
  } catch (error: any) {
    throw new Error(`Failed to update document: ${error.message}`);
  }
}
