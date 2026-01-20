import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  const connectionString = process.env.DATABASE_URL!;
  
  // Log the connection attempt (helpful for Thunder Client debugging)
  console.log("Checking DB Connection for:", connectionString.split('@')[1]); 

  const sql = postgres(connectionString, {
    ssl: 'require',
    connect_timeout: 20, // Increased timeout for production cold starts
    max: 1,
    prepare: false,      // MANDATORY for Supabase Pooler (Port 6543)
  });

  try {
    // Test query
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name`;
    
    return NextResponse.json({
      status: "Connected Successfully ✅",
      time: result[0].current_time,
      database: result[0].db_name,
      environment: process.env.NODE_ENV
    });

  } catch (error: any) {
    console.error("Health Check Failed:", error.message);
    
    return NextResponse.json({
      status: "Connection Failed ❌",
      error: error.message,
      code: error.code, 
      hint: "If you see 'Tenant not found', check your DATABASE_URL username format."
    }, { status: 500 });

  } finally {
    // Close the connection so we don't leak it in serverless environments
    await sql.end();
  }
}