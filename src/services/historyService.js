import { supabase } from "../config/supabase";

export async function addHistory(userId, type, content) {
  // type: "search" | "chat"
  const { error } = await supabase.from("history").insert({
    user_id: userId,
    type,
    content,
  });
  if (error) console.log("History insert error:", error.message);
}

export async function getHistory(userId) {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.log("History fetch error:", error.message);
    return [];
  }
  return data;
}

export async function clearHistory(userId) {
  const { error } = await supabase.from("history").delete().eq("user_id", userId);
  if (error) console.log("History clear error:", error.message);
}
