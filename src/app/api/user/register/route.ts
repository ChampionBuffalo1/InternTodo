import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../controller/user";

export async function POST(request: NextRequest) {
  const json: Record<string, unknown> = {};
  try {
    const body = await request.json();
    const user = await createUser(body.username, body.email);
    json["user"] = user;
  } catch (err) {
    json["error"] = (err as Error).message || "Unknown error";
  }
  return NextResponse.json(json);
}
