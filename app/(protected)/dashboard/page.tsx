import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="p-6 flex flex-col flex-1 justify-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col flex-1 items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={400}
            height={400}
            loading="eager"
          />

          <h1 className="text-4xl font-bold leading-tight">
            Adaptive Task Management
          </h1>

          <p className="mt-4 dark:text-zinc-400 max-w-md">
            Manage your tasks seamlessly across mobile, tablet, and desktop
            experiences.
          </p>

          <Link href="/tasks" className="w-full text-center max-w-md mt-5">
            <Button
              className="mt-4 cursor-pointer w-full bg-blue-400 p-6"
              variant={"default"}
              size={"lg"}
            >
              Get Started
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
