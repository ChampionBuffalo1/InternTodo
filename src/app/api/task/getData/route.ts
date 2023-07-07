import { Action } from "@/app/types";
import { AuthHeader } from "@/lib/Constants";
import { getTasks } from "../../controller/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Middleware should verify that the filter param is of type action
  const filter = searchParams.get("filter") as Action;
  // Middleware should verify that the auth header is present
  const createdBy = request.headers.get(AuthHeader)!;
  const tasks = await getTasks(filter, createdBy);
  return NextResponse.json({
    tasks,
  });
}
