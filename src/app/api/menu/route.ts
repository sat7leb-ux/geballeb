import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data: cuisines, error: cuisinesError } = await supabase
      .from('cuisines')
      .select('*')
      .order('sort_order');

    if (cuisinesError) {
      return NextResponse.json({ error: cuisinesError.message }, { status: 500 });
    }

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 500 });
    }

    const { data: menuItems, error: itemsError } = await supabase
      .from('menu_items')
      .select('*')
      .order('sort_order');

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }

    return NextResponse.json({ cuisines, categories, menuItems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan, is_spicy, is_featured } = body;

    const { data, error } = await supabase
      .from('menu_items')
      .insert([{ cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan, is_spicy, is_featured }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan, is_spicy, is_featured } = body;

    const { data, error } = await supabase
      .from('menu_items')
      .update({ cuisine_id, category_id, name, description, price, image, is_vegetarian, is_vegan, is_spicy, is_featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
