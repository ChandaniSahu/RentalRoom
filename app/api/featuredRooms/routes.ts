import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const rooms = await sql`
      SELECT * FROM rooms 
      WHERE is_available = true
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}