import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
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

        // query params
        const { searchParams } = new URL(request.url);

        const search =
            searchParams.get("search") || "";

        const sortBy =
            searchParams.get("sortBy");

        const order =
            searchParams.get("order");

        // tasks
        const tasks = await prisma.task.findMany({
            where: {
                userId: user.id,

                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },

                    {
                        description: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });

        // priority ranking
        const priorityOrder = {
            HIGH: 0,
            MEDIUM: 1,
            LOW: 2,
        };

        // sorting
        tasks.sort((a, b) => {
            // completed paling belakang
            if (a.completed !== b.completed) {
                return (
                    Number(a.completed) -
                    Number(b.completed)
                );
            }

            let compare = 0;

            switch (sortBy) {
                case "priority":
                    compare =
                        priorityOrder[a.priority] -
                        priorityOrder[b.priority];
                    break;

                case "dueDate":
                    compare =
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime();
                    break;

                default:
                    // default sorting
                    compare =
                        priorityOrder[a.priority] -
                        priorityOrder[b.priority];

                    if (compare === 0) {
                        compare =
                            new Date(a.dueDate).getTime() -
                            new Date(b.dueDate).getTime();
                    }
            }

            // order
            if (order === "desc") {
                return -compare;
            }

            return compare;
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

export async function POST(request: NextRequest) {
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
        const body = await request.json();

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