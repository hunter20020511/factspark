import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bjtmblhskgmmkjytxyds.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdG1ibGhza2dtbWtqeXR4eWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDg4NjcsImV4cCI6MjAyNjAyNDg2N30.PAN2wh1d1O9KrnOmHYe3FbLJ9zKF_vSrGsmQ_vD7ecY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
