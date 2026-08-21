import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://aswrcnnlxijmfqmgbpeh.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_tlff1hfeAMgF0ZUrJuhR7w_Td6xbtHI";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);