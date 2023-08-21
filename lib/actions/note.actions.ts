"use server";

import prisma from "@/lib/prismadb";

interface IParams {
  id?: string;
}

export async function addNote(title: string, desc: string, id: string) {
  try {
    if (id === undefined) return;
    await prisma.note.create({
      data: {
        title,
        desc,
        groupId: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to add note: ${error.message}`);
  }
}

export async function fetchNotes(params: IParams) {
  try {
    const { id } = params;
    if (id === undefined) return;
    const notes = await prisma.note.findMany({
      where: {
        groupId: id[0],
      },
    });
    return notes;
  } catch (error: any) {
    throw new Error(`Failed to fetch notes: ${error.message}`);
  }
}

export async function deleteNote(id: string) {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    await prisma.note.deleteMany({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete note: ${error.message}`);
  }
}
