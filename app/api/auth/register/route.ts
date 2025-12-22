// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // PERBAIKAN 1: Hapus kurung kurawal { }

export async function POST(req: Request) {
  try {
    const { email, password, name, nik, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Mohon lengkapi data" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // PERBAIKAN 2: Gunakan Password Polos (Tanpa Bcrypt)
    // const hashedPassword = await bcrypt.hash(password, 10); // <--- JANGAN DIPAKAI
    const hashedPassword = password; // <--- PAKAI INI

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Simpan password asli
        name,
        nik,
        role: role || "PATIENT",
      },
    });

    return NextResponse.json(
      { message: "Registrasi Berhasil", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
