import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bjtmblhskgmmkjytxyds.supabase.co";
const supabaseKey =
  "abcd";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
