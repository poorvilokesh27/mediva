
import localData from "../data/medicineData.json";

// ============================================
// SEARCH MEDICINES
// ============================================

export async function searchMedicines(query) {
  try {
    const q = String(query || "")
      .trim()
      .toLowerCase();

    if (!q) {
      return [];
    }

    const results = localData.filter((item) => {
      const disease =
        String(item?.disease || "")
          .toLowerCase();

      const name =
        String(item?.name || "")
          .toLowerCase();

      const category =
        String(item?.category || "")
          .toLowerCase();

      const symptoms = Array.isArray(
        item?.symptoms
      )
        ? item.symptoms
        : [];

      const usedFor = Array.isArray(
        item?.usedFor
      )
        ? item.usedFor
        : [];

      const medicines = Array.isArray(
        item?.medicines
      )
        ? item.medicines
        : [];

      const relatedConditions =
        Array.isArray(
          item?.relatedConditions
        )
          ? item.relatedConditions
          : [];

      const symptomMatch =
        symptoms.some((symptom) =>
          String(symptom)
            .toLowerCase()
            .includes(q)
        );

      const usedForMatch =
        usedFor.some((value) =>
          String(value)
            .toLowerCase()
            .includes(q)
        );

      const relatedConditionMatch =
        relatedConditions.some((value) =>
          String(value)
            .toLowerCase()
            .includes(q)
        );

      const medicineMatch =
        medicines.some((medicine) =>
          String(
            medicine?.name || ""
          )
            .toLowerCase()
            .includes(q)
        );

      return (
        disease.includes(q) ||
        name.includes(q) ||
        category.includes(q) ||
        symptomMatch ||
        usedForMatch ||
        relatedConditionMatch ||
        medicineMatch
      );
    });

    console.log(
      "SEARCH QUERY:",
      q
    );

    console.log(
      "SEARCH RESULTS:",
      results.length
    );

    return results;
  } catch (error) {
    console.log(
      "Medicine search error:",
      error
    );

    return [];
  }
}

// ============================================
// GET ALL CATEGORIES
// ============================================

export function getAllCategories() {
  try {
    const categories = localData
      .map((item) => item?.category)
      .filter(Boolean);

    return [
      ...new Set(categories),
    ];
  } catch (error) {
    console.log(
      "CATEGORY ERROR:",
      error
    );

    return [];
  }
}

// ============================================
// GET ALL MEDICINES
// ============================================

export function getAllMedicines() {
  try {
    return Array.isArray(localData)
      ? localData
      : [];
  } catch (error) {
    console.log(
      "GET ALL MEDICINES ERROR:",
      error
    );

    return [];
  }
}

// ============================================
// GET MEDICINE BY ID
// ============================================

export function getMedicineById(
  medicineId
) {
  try {
    if (!medicineId) {
      return null;
    }

    const found = localData.find(
      (item) =>
        String(item?.id) ===
        String(medicineId)
    );

    return found || null;
  } catch (error) {
    console.log(
      "GET MEDICINE ERROR:",
      error
    );

    return null;
  }
}
