import { NextResponse } from "next/server";
import { auth } from "./lib/auth"; 

export async function proxy(request) { 
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
export const config = {
  matcher: ["/all-prompts/:path*"],
};