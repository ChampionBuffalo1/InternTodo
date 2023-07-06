import { NextRequest, NextResponse } from "next/server";
import { deleteCompletedTask } from "../../controller/tasks";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deleted = await deleteCompletedTask(body.id);
  return NextResponse.json({
    deleteCount: deleted.deletedCount,
  });
}
