
import { supabase } from "../config/supabase";

// =====================================================
// ADD HISTORY
// =====================================================

export async function addHistory(
  userId,
  type,
  content
) {
  try {
    if (!userId) {
      console.log(
        "History error: userId is missing"
      );
      return false;
    }

    if (!content || !String(content).trim()) {
      console.log(
        "History error: content is empty"
      );
      return false;
    }

    const cleanType =
      type === "chat"
        ? "chat"
        : "search";

    const { data, error } =
      await supabase
        .from("history")
        .insert({
          user_id: userId,
          type: cleanType,
          content: String(content).trim(),
        })
        .select()
        .single();

    if (error) {
      console.log(
        "History insert error:",
        error.message
      );
      console.log(
        "Full history error:",
        error
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
      "History save exception:",
      error
    );

    return false;
  }
}

// =====================================================
// GET HISTORY
// =====================================================

export async function getHistory(userId) {
  try {
    if (!userId) {
      console.log(
        "History fetch error: userId is missing"
      );

      return [];
    }

    const { data, error } =
      await supabase
        .from("history")
        .select(
          "id, user_id, type, content, created_at"
        )
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

    return data || [];
  } catch (error) {
    console.log(
      "History fetch exception:",
      error
    );

    return [];
  }
}

// =====================================================
// DELETE ONE HISTORY ITEM
// =====================================================

export async function deleteHistory(
  historyId,
  userId
) {
  try {
    if (!historyId || !userId) {
      return false;
    }

    const { error } =
      await supabase
        .from("history")
        .delete()
        .eq("id", historyId)
        .eq("user_id", userId);

    if (error) {
      console.log(
        "Delete history error:",
        error.message
      );

      return false;
    }

    return true;
  } catch (error) {
    console.log(
      "Delete history exception:",
      error
    );

    return false;
  }
}

// =====================================================
// CLEAR ALL HISTORY
// =====================================================

export async function clearHistory(
  userId
) {
  try {
    if (!userId) {
      return false;
    }

    const { error } =
      await supabase
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

    console.log(
      "History cleared successfully"
    );

    return true;
  } catch (error) {
    console.log(
      "History clear exception:",
      error
    );

    return false;
  }
}

