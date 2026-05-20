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
                dueDate: "asc"
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

export async function POST(req: Request) {
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

        // Ambil body request
        const body = await req.json();

        const {
            title,
            description,
            dueDate,
            priority,
        } = body;

        // Validasi sederhana
        if (!title) {
            return NextResponse.json(
                {
                    message: "Title is required",
                },
                {
                    status: 400,
                }
            );
        }

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
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

        // Simpan task baru
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                priority: priority || "LOW",
                completed: false,
                userId: user.id,
            },
        });

        return NextResponse.json(
            {
                message: "Task created successfully",
                data: newTask,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("CREATE TASK ERROR:", error);

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