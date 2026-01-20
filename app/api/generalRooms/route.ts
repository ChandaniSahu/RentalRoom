import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const location = searchParams.get('location');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const propertyType = searchParams.get('propertyType');
  const tenantPreference = searchParams.get('tenantPreference');
  
  // 1. Get the limit from params, or default to 50
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  // 2. Safety check: Ensure limit is a positive number and not too high
  const safeLimit = isNaN(limit) || limit <= 0 ? 50 : Math.min(limit, 100);

  try {
    const rooms = await sql`
      SELECT * FROM rooms 
      WHERE is_available = true
      ${location ? sql`AND location ILIKE ${'%' + location + '%'}` : sql``}
      ${minPrice ? sql`AND rent_price >= ${minPrice}` : sql``}
      ${maxPrice ? sql`AND rent_price <= ${maxPrice}` : sql``}
      ${propertyType ? sql`AND property_type = ${propertyType}` : sql``}
      ${tenantPreference ? sql`AND tenant_preference = ${tenantPreference}` : sql``}
      ORDER BY created_at DESC 
      LIMIT ${safeLimit}
    `;
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}