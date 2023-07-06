import { NextResponse } from "next/server";
import { deleteCompletedTask } from "../../controller/tasks";

export async function POST() {
  const deleted = await deleteCompletedTask();
  return NextResponse.json({
    deleteCount: deleted.deletedCount,
  });
}
