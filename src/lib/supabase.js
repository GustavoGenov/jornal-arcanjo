import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nisbarqzsjqylsvnyxrm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
