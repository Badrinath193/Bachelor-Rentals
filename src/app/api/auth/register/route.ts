import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(["GUEST", "MEMBER", "ADMIN"]).default("MEMBER")
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hash(body.password, 12);
    const user = await prisma.user.create({
      data: { email: body.email, name: body.name, passwordHash, role: body.role }
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
