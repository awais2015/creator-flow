import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_API_URL || 'no url';
const supabaseKey = process.env.SUPABASE_API_KEY || 'no key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  const { title, image, description } = await req.json();
  try {
    const { error } = await supabase
      .from('scrap_data')
      .insert([{ title, image, description }]);
    if (error) {
      return NextResponse.json({ isError: true });
    } else {
      return NextResponse.json({
        isError: false,
        data: { title, description, image },
      });
    }
  } catch (error) {
    return NextResponse.json({ isError: true });
  }
}
