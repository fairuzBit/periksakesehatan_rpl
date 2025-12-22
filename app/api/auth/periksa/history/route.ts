// app/api/checkup/history/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // 1. Ambil userId dari alamat URL (contoh: ?userId=1)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID wajib ada" },
        { status: 400 }
      );
    }

    // 2. Ambil data dari database (diurutkan dari yang terbaru)
    const history = await prisma.healthCheckup.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: history }, { status: 200 });
  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
