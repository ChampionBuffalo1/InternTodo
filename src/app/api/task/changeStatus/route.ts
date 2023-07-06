import { NextRequest, NextResponse } from "next/server";
import { changeStatus } from "../../controller/tasks";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const updated = await changeStatus(body.id);
  if (!updated) {
    NextResponse.json({
      error: "No such task with id found",
    });
  }
  return NextResponse.json({
    updated,
  });
}
