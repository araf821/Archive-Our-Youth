import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { EditProfileValidator } from "@/lib/validators/edit-profile";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { newName, newImageUrl } = EditProfileValidator.parse(body);

    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    await db.user.update({
      where: {
        userId: currentUser.userId,
      },
      data: {
        name: newName,
        imageUrl: newImageUrl,
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
