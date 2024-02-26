import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/home",
    "/post/:path*",
    "/about",
    "/contact",
    "/submit",
    "/api/post",
    "/api/uploadthing",
    "/api/comment",
    "/api/posts",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
