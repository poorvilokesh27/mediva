import localData from "../data/medicineData.json";
import { supabase } from "../config/supabase";

// Searches the local seed dataset first (fast, offline).
// Once you load your full dataset into Supabase (table: diseases), this
// also queries Supabase so the app scales beyond the bundled JSON file.
export async function searchMedicines(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const localResults = localData.filter((item) => {
    return (
      item.disease.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.symptoms.some((s) => s.toLowerCase().includes(q)) ||
      item.medicines.some((m) => m.name.toLowerCase().includes(q))
    );
  });

  try {
    const { data, error } = await supabase
      .from("diseases")
      .select("*")
      .ilike("disease", `%${q}%`)
      .limit(20);

    if (!error && data && data.length > 0) {
      const merged = [...localResults];
      data.forEach((remote) => {
        if (!merged.find((l) => l.disease === remote.disease)) {
          merged.push(remote);
        }
      });
      return merged;
    }
  } catch (e) {
    // Supabase table not set up yet, silently fall back to local data
  }

  return localResults;
}

export function getAllCategories() {
  return [...new Set(localData.map((item) => item.category))];
}
