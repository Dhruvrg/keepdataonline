"use server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function updateUser(name: string, image: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return;
    }
    await prisma.user.update({
      where: { id: currentUser?.id },
      data: { name, image },
    });
  } catch (error: any) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}
