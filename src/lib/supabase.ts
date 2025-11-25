import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL check:', supabaseUrl ? 'Found' : 'MISSING');
console.log('Supabase Key check:', supabaseAnonKey ? 'Found' : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'sb-gbjdzxxaacujsise-auth-token',
  }
});

export type JournalEntry = {
  id: string;
  created_at: string;
  updated_at: string;
  text_entry: string;
  mood: string | null;
  tags: string[] | null;
  voice_note_text: string | null;
  reframe_message: string | null;
};
