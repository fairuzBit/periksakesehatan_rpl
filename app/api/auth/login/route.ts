// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // PERBAIKAN: Hapus kurung kurawal { }

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // PERBAIKAN: Cek Password Polos (Langsung bandingkan string)
    // const isMatch = await bcrypt.compare(password, user.password); // <--- JANGAN DIPAKAI
    const isMatch = password === user.password; // <--- PAKAI INI

    if (!isMatch) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        nik: user.nik,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
