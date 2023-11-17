import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { input, image } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    await db.user.update({
      where: {
        userId: currentUser.userId,
      },
      data: {
        name: input,
        imageUrl: image,
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
