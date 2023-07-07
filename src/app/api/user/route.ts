import { AuthHeader } from "@/lib/Constants";
import { NextRequest, NextResponse } from "next/server";
import { hasUser } from "../controller/user";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userExists = await hasUser(body.username, body.email);
  return NextResponse.json({
    exists: userExists,
  });
}
