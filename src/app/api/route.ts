import { NextResponse } from "next/server";
import { checkDbConnection } from "@/lib/db";

export async function GET() {
  const dbCheck = await checkDbConnection();
  if (!dbCheck.success) {
    return NextResponse.json(
      { 
        error: "Database connection failed", 
        details: dbCheck.error,
        diagnosticTrace: dbCheck.diagnosticTrace 
      }, 
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Hello, world!", dbStatus: "Connected" });
}