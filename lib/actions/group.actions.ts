"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function createGroup(name: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("You need to Login");
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
      throw new Error("You need to Login");
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
