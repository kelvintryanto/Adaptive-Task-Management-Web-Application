import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Ambil session login
        const session = await getServerSession(authOptions);

        // Jika belum login
        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        // Cari user berdasarkan email session
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Ambil semua task berdasarkan user
        const tasks = await prisma.task.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("GET TASKS ERROR:", error);

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}