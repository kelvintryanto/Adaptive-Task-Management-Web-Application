"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");

        return;
      }

      toast.success("Login successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      {/* TOP BAR */}

      {/* MAIN CONTENT */}
      <div className="fixed top-2 right-4 z-50">
        <ThemeToggle withText />
      </div>
      <main className="flex flex-1">
        <div className="grid w-full lg:grid-cols-2">
          {/* LEFT SIDE - DESKTOP BRANDING */}
          <section className="hidden lg:flex flex-col  items-center justify-between dark:bg-zinc-900 bg-zinc-400 dark:text-white text-foreground p-12">
            <div>
              <Image
                src="/logo.png"
                alt="Logo"
                width={400}
                height={400}
                className="mb-6"
              />

              <h1 className="text-4xl font-bold leading-tight">
                Adaptive Task Management
              </h1>

              <p className="mt-4 dark:text-zinc-400 max-w-md">
                Manage your tasks seamlessly across mobile, tablet, and desktop
                experiences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                <span>Adaptive user experience</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                <span>Task priority management</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                <span>Due date reminders</span>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE - LOGIN FORM */}
          <section className="flex items-center justify-center p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-sm shadow-xl border-zinc-200 dark:border-zinc-800">
              <CardHeader className="space-y-1 text-center">
                {/* MOBILE & TABLET LOGO */}
                <div className="flex justify-center lg:hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="mb-2"
                  />
                </div>

                <CardTitle className="text-2xl font-bold">
                  Welcome Back
                </CardTitle>

                <CardDescription>
                  Login to continue managing your tasks
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@turboly.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>

                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* LOGIN BUTTON */}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                  </Button>

                  {/* DEMO ACCOUNT */}
                  <div className="rounded-lg border bg-zinc-50 dark:bg-zinc-900 p-3 text-sm">
                    <p className="font-medium mb-1">Demo Account</p>

                    <p className="text-zinc-500">admin@turboly.com</p>

                    <p className="text-zinc-500">password123</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
