import { db } from "@/lib/db";
import { UserSetupValidator } from "@/lib/validators/user-setup";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { imageUrl, name } = UserSetupValidator.parse(body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.user.update({
      where: {
        userId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return new NextResponse("Account created.", { status: 200 });
  } catch (error) {
    console.error("Account Setup Error", { status: 500 });
    return new NextResponse("Internal Error", { status: 500 });
  }
}
