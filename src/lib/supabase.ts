import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "rwfjjaxraxptlrbufbzc.supabase.co";
const supabaseAnonKey = "sb_publishable_NHnfhDy20_Qy74BBP2SD_g_8oN2XHLr";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
