import { NextRequest, NextResponse } from "next/server";
import { Action } from "./app/types";
const basePath = "/api/task";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(basePath + "/getData")) {
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
  if (request.nextUrl.pathname.startsWith(basePath + "/addData")) {
    if (!Object.hasOwn(reqBody, "content")) {
      return NextResponse.json({
        error: "task content missing from request body",
      });
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith(basePath + "/changeStatus")) {
    if (!Object.hasOwn(reqBody, "id")) {
      return NextResponse.json({
        error: "task id missing from request body",
      });
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith(basePath + "/deleteData")) {
    if (!Object.hasOwn(reqBody, "id")) {
      return NextResponse.json({
        error: "task id missing from request body",
      });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/task/:path*"],
};
