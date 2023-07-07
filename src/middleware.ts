import { Action } from "@types";
import { AuthHeader } from "@/lib/Constants";
import { NextRequest, NextResponse } from "next/server";

const taskPath = "/api/task";

export async function middleware(request: NextRequest) {
  // On all routes except /api/user
  const pathname = request.nextUrl.pathname;
  const emailHeader = request.headers.get(AuthHeader);
  if (!emailHeader && !pathname.startsWith("/api/user"))
    return NextResponse.json({
      error: `All request must have ${AuthHeader} header`,
    });

  if (pathname === taskPath + "/getData") {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter")?.toLowerCase() as Action;
    if (filter !== "all" && filter !== "active" && filter !== "completed") {
      return NextResponse.json({
        error: "filter query parameter must be either all, active or completed",
      });
    }
    return NextResponse.next();
  }

  const reqBody = await request.json();
  if (pathname.startsWith("/api/user")) {
    if (!reqBody.username || !reqBody.email) {
      return NextResponse.json({
        error: "username or email missing from request body",
      });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(taskPath + "/addData")) {
    if (!reqBody.content) {
      return NextResponse.json({
        error: "task content missing from request body",
      });
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith(taskPath + "/changeStatus") ||
    pathname.startsWith(taskPath + "/deleteData")
  ) {
    if (!reqBody.id) {
      return NextResponse.json({
        error: "task id missing from request body",
      });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/task/:path*", "/api/user/:path*"],
};
