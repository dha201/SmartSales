import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    /**
     * publicRoutes: An array of route patterns that should be accessible to the public without requiring authentication. 
     * In this configuration, the following routes are considered public:
        /: The root route of the application.
        auth(.*): Any route that starts with auth, such as /auth/login or /auth/register.
        /portal(.*): Any route that starts with /portal.
     */
    publicRoutes: ['/', 'auth(.*)', '/portal(.*)'],
    ignoredRoutes: ['/chatbox'],
});

export const config = {
    /**
     * matcher: specify which routes should be handled by the middleware
     * /((?!.+. [w]+$|_next).*): This pattern matches any route that does not end with a file extension (e.g., .js, .css) and is not a Next.js internal route (e.g., /_next).
     * /: This pattern matches the root route of the application
     * /(api|trpc)(.*): This pattern matches any route that starts with /api or /trpc. It ensures that the middleware is applied to API routes and tRPC (TypeScript Remote Procedure Call) routes.
     */
    matcher: ['/((?!.+. [w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
