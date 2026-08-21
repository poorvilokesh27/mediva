
import { supabase } from "../config/supabase";

export async function addHistory(userId, type, content) {
  try {
    if (!userId) {
      console.log("History error: No user ID");
      return false;
    }

    if (!content || !content.trim()) {
      console.log("History error: Empty content");
      return false;
    }

    const { data, error } = await supabase
      .from("history")
      .insert({
        user_id: userId,
        type: type,
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      console.log(
        "History insert error:",
        error.message
      );
      return false;
    }

    console.log(
      "History saved successfully:",
      data
    );

    return true;
  } catch (error) {
    console.log(
      "History insert exception:",
      error?.message || error
    );

    return false;
  }
}

export async function getHistory(userId) {
  try {
    if (!userId) {
      console.log("History fetch error: No user ID");
      return [];
    }

    const { data, error } = await supabase
      .from("history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(100);

    if (error) {
      console.log(
        "History fetch error:",
        error.message
      );
      return [];
    }

    console.log(
      "History loaded:",
      data?.length || 0
    );

    return data || [];
  } catch (error) {
    console.log(
      "History fetch exception:",
      error?.message || error
    );

    return [];
  }
}

export async function clearHistory(userId) {
  try {
    if (!userId) return false;

    const { error } = await supabase
      .from("history")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.log(
        "History clear error:",
        error.message
      );
      return false;
    }

    console.log("History cleared successfully");

    return true;
  } catch (error) {
    console.log(
      "History clear exception:",
      error?.message || error
    );

    return false;
  }
}

