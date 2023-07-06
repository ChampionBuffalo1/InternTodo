import { NextRequest, NextResponse } from "next/server";
import { addTask } from "../../controller/tasks";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = await addTask(body.content);
  return NextResponse.json({ id });
}
