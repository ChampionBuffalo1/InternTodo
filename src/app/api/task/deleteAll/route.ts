import { AuthHeader } from "@/lib/Constants";
import { NextRequest, NextResponse } from "next/server";
import { deleteCompletedTask } from "../../controller/task";

export async function POST(request: NextRequest) {
  const createdBy = request.headers.get(AuthHeader)!;
  const deleted = await deleteCompletedTask(createdBy);
  return NextResponse.json({
    deleteCount: deleted.deletedCount,
  });
}
