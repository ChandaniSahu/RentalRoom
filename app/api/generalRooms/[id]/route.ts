import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' ,prepare: false, 
  max: 1, connect_timeout: 10});

export async function GET(
  request: Request,
  { params }: { params: Promise< { id: string }> }
) {
  // console.log('process',process.env.DATABASE_URL)
  console.log('sql',sql)
  // Grab the ID from the folder name [roomId]
  const resolvedParams = await params ;
  console.log('resolvedparams',resolvedParams)
  const id = resolvedParams.id;

  try {
    // We use [0] or a LIMIT 1 because we only expect one result
    const room = await sql`
      SELECT * FROM rooms 
      WHERE id = ${id} 
      LIMIT 1
    `;

    if (room.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Return the single room object instead of an array
    return NextResponse.json(room[0]);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}