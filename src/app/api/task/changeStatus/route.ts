import { AuthHeader } from "@/lib/Constants";
import { changeStatus } from "../../controller/task";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const createdBy = request.headers.get(AuthHeader)!;
  const body = await request.json();
  const updated = await changeStatus(body.id, createdBy);
  if (!updated) {
    NextResponse.json({
      error: "No such task with id found",
    });
  }
  return NextResponse.json({
    updated,
  });
}
