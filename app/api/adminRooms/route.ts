import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

// Required for verifying JWT tokens in DELETE and PATCH
const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { owner_id, ...roomData } = body;
 
    console.log('body',body)
    // await sql`INSERT INTO profiles (id) VALUES (${owner_id}) ON CONFLICT (id) DO NOTHING`;

    const [newRoom] = await sql`
      INSERT INTO rooms ${sql({owner_id, ...roomData, updated_at: new Date().toISOString() })} 
      RETURNING *
    `;
    return NextResponse.json({ success: true, data: newRoom }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(request: Request) {
  // 1. Extract token from header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  // --- NEW: STRICT CHECK ---
  if (!token) {
    return NextResponse.json(
      { error: 'Authentication token is required' }, 
      { status: 401 }
    );
  }

  try {
    // 2. Identify the user
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    // If Supabase can't find the user or the token is expired/invalid
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired token' }, 
        { status: 401 }
      );
    }

    // 3. Fetch data for the authenticated user only
    const rooms = await sql`
      SELECT * FROM rooms 
      WHERE owner_id = ${user.id} 
      ORDER BY created_at DESC
    `;

    return NextResponse.json(rooms);

  } catch (error: any) {
    // Log the error for internal debugging
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ error: "No token provided" }, { status: 401 });

    const { data: { user } } = await supabaseAuth.auth.getUser(token);
    if (!user) return NextResponse.json({ error: "Invalid user" }, { status: 401 });

    const body = await request.json();
    const { id, ...updateData } = body; // Extract id, keep the rest as updateData

    const [updatedRoom] = await sql`
      UPDATE rooms 
      SET ${sql(updateData)}, updated_at = ${new Date().toISOString()}
      WHERE id = ${id} AND owner_id = ${user.id}
      RETURNING *
    `;

    if (!updatedRoom) return NextResponse.json({ error: "Room not found or unauthorized" }, { status: 404 });
    return NextResponse.json({ success: true, data: updatedRoom });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!id || !token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await supabaseAuth.auth.getUser(token);
    if (!user) return NextResponse.json({ error: "Invalid User" }, { status: 401 });

    const [deleted] = await sql`DELETE FROM rooms WHERE id = ${id} AND owner_id = ${user.id} RETURNING id`;
    if (!deleted) return NextResponse.json({ error: "Room not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}