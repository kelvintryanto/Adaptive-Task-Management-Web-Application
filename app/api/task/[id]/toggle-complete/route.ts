import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

type Params = Promise<{
    id: string;
}>;

export async function PATCH(
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

        // params
        const { id } = await params;

        // task ownership check
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

        // toggle complete
        const updatedTask = await prisma.task.update({
            where: {
                id,
            },

            data: {
                completed: !existingTask.completed,
            },
        });

        return NextResponse.json({
            message: "Task status updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        console.error("TOGGLE TASK ERROR:", error);

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