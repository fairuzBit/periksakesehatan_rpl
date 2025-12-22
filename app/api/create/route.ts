// app/api/checkup/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // PERBAIKAN: Hapus kurung kurawal { }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      systolic,
      diastolic,
      bloodSugar,
      weight,
      height,
      status,
      notes,
      userId,
    } = body;

    const newCheckup = await prisma.healthCheckup.create({
      data: {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
        bloodSugar: Number(bloodSugar) || 0,
        weight: Number(weight) || 0,
        height: Number(height) || 0,
        status: status,
        notes: notes || "",
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      { message: "Berhasil", data: newCheckup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create Checkup Error:", error);
    return NextResponse.json({ message: "Gagal simpan" }, { status: 500 });
  }
}
