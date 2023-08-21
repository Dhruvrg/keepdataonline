"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function createGroup(name: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return;
    }
    await prisma.group.create({
      data: {
        name,
        image: "",
        userId: currentUser?.id,
        users: [currentUser?.id],
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to create group: ${error.message}`);
  }
}

export async function fetchGroups() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return;
    }
    const groups = await prisma.group.findMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return groups;
  } catch (error: any) {
    throw new Error(`Failed to fetch group: ${error.message}`);
  }
}

export async function deleteGroup(id: string) {
  try {
    if (id === undefined || !id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    await prisma.group.deleteMany({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to delete group: ${error.message}`);
  }
}

export async function updateGroup(name: string, image: string, id: string) {
  try {
    await prisma.group.update({
      where: { id: id },
      data: { name, image },
    });
  } catch (error: any) {
    throw new Error(`Failed to update group: ${error.message}`);
  }
}
