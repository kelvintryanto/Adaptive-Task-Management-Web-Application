import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        const isLoginPage =
            req.nextUrl.pathname === "/";

        // kalau sudah login dan buka login page
        if (token && isLoginPage) {
            return Response.redirect(
                new URL("/dashboard", req.url)
            );
        }

        if (!token && !isLoginPage) {
            return Response.redirect(
                new URL("/", req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};