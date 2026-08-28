import { supabase } from "../config/supabase";

// ======================================================
// ADD FAVORITE
// ======================================================

export async function addFavorite(
  userId,
  medicineId,
  item
) {
  try {
    if (!userId || !medicineId || !item) {
      console.log("ADD FAVORITE: Missing data");

      return false;
    }

    const id = String(medicineId);

    const medicineName =
      item.name ||
      item.disease ||
      "Medicine";

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        medicine_id: id,
        medicine_name: medicineName,
        medicine_data: item,
      })
      .select()
      .single();

    if (error) {
      console.log(
        "ADD FAVORITE ERROR:",
        error
      );

      return false;
    }

    console.log(
      "FAVORITE ADDED:",
      data
    );

    return true;
  } catch (error) {
    console.log(
      "ADD FAVORITE EXCEPTION:",
      error
    );

    return false;
  }
}

// ======================================================
// REMOVE FAVORITE
// ======================================================

export async function removeFavorite(
  userId,
  medicineId
) {
  try {
    if (!userId || !medicineId) {
      return false;
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq(
        "user_id",
        userId
      )
      .eq(
        "medicine_id",
        String(medicineId)
      );

    if (error) {
      console.log(
        "REMOVE FAVORITE ERROR:",
        error
      );

      return false;
    }

    console.log(
      "FAVORITE REMOVED:",
      medicineId
    );

    return true;
  } catch (error) {
    console.log(
      "REMOVE FAVORITE EXCEPTION:",
      error
    );

    return false;
  }
}

// ======================================================
// GET ALL FAVORITES
// ======================================================

export async function getFavorites(userId) {
  try {
    if (!userId) {
      return [];
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) {
      console.log(
        "GET FAVORITES ERROR:",
        error
      );

      return [];
    }

    console.log(
      "FAVORITES LOADED:",
      data
    );

    return data || [];
  } catch (error) {
    console.log(
      "GET FAVORITES EXCEPTION:",
      error
    );

    return [];
  }
}

// ======================================================
// CHECK IF FAVORITE
// ======================================================

export async function isFavorite(
  userId,
  medicineId
) {
  try {
    if (!userId || !medicineId) {
      return false;
    }

    const { data, error } =
      await supabase
        .from("favorites")
        .select("id")
        .eq(
          "user_id",
          userId
        )
        .eq(
          "medicine_id",
          String(medicineId)
        )
        .maybeSingle();

    if (error) {
      console.log(
        "CHECK FAVORITE ERROR:",
        error
      );

      return false;
    }

    return !!data;
  } catch (error) {
    console.log(
      "CHECK FAVORITE EXCEPTION:",
      error
    );

    return false;
  }
}