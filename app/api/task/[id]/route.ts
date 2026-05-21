import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Params = Promise<{
    id: string;
}>;

export async function DELETE(
    req: Request,
    { params }: { params: Params }
) {
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

        // Ambil user
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
            },
        });

        // Jika user tidak ditemukan
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

        // Ambil id task
        const { id } = await params;

        // Cari task berdasarkan id + userId
        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: user.id,
            },
        });

        // Jika task tidak ditemukan
        if (!task) {
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );
        }

        // Delete task
        await prisma.task.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("DELETE TASK ERROR:", error);

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

export async function PUT(
    req: Request,
    { params }: { params: Params }
) {
    try {
        // session
        const session = await getServerSession(authOptions);

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

        // user
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

        // task id
        const { id } = await params;

        // body
        const body = await req.json();

        const {
            title,
            description,
            dueDate,
            priority,
        } = body;

        // validation
        if (!title || !dueDate || !priority) {
            return NextResponse.json(
                {
                    message: "Missing required fields",
                },
                {
                    status: 400,
                }
            );
        }

        // check ownership
        const existingTask = await prisma.task.findFirst({
            where: {
                id,
                userId: user.id,
            },
        });

        if (!existingTask) {
            return NextResponse.json(
                {
                    message: "Task not found",
                },
                {
                    status: 404,
                }
            );
        }

        // update task
        const updatedTask = await prisma.task.update({
            where: {
                id,
            },

            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                priority,
            },
        });

        return NextResponse.json({
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error("UPDATE TASK ERROR:", error);

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