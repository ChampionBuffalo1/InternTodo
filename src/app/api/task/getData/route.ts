import { Action } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "../../controller/tasks";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Middleware should verify that the filter param is of type action
  const filter = searchParams.get("filter") as Action;
  const tasks = await getTasks(filter);

  return NextResponse.json({
    tasks,
  });
}
