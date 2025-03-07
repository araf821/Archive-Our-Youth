import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { UserSetupValidator } from "@/lib/validators/user-setup";

export async function PUT(req: Request) {
  try {
    const authorizedUser = await currentUser();
    const body = await req.json();
    const { imageUrl, name } = UserSetupValidator.parse(body);

    if (!authorizedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.user.update({
      where: {
        userId: authorizedUser.id,
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
