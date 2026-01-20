import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js'; // Or your local supabase config

// Initialize Supabase (Ensure these are in your .env file)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role Key to bypass RLS during seeding
);

export async function GET(request: Request) {
  console.log('--- Starting Data Upload to Supabase ---');

  try {
    // 1. Read the dummy.json file
    const filePath = path.join(process.cwd(), 'app', 'api', 'dummy.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const roomsData = JSON.parse(fileContents);

    // 2. Upload to Supabase
    // .upsert will insert if new, or update if the ID already exists
    const { data, error } = await supabase
      .from('rooms')
      .upsert(roomsData, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('Supabase Upload Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log(`Success: Uploaded ${data.length} rooms.`);

    return NextResponse.json({
      message: 'Data uploaded successfully',
      count: data.length,
      insertedData: data
    });

  } catch (error: any) {
    console.error('System Error:', error.message);
    return NextResponse.json(
      { error: 'Server Error', details: error.message },
      { status: 500 }
    );
  }
}