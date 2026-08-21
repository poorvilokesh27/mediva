
import localData from "../data/medicineData.json";

export async function searchMedicines(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return [];
  }

  try {
    const results = localData.filter((item) => {
      const disease = item.disease?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";

      const symptoms = Array.isArray(item.symptoms)
        ? item.symptoms
        : [];

      const medicines = Array.isArray(item.medicines)
        ? item.medicines
        : [];

      const symptomMatch = symptoms.some((symptom) =>
        String(symptom).toLowerCase().includes(q)
      );

      const medicineMatch = medicines.some((medicine) =>
        String(medicine?.name || "").toLowerCase().includes(q)
      );

      return (
        disease.includes(q) ||
        category.includes(q) ||
        symptomMatch ||
        medicineMatch
      );
    });

    console.log("Search:", q);
    console.log("Results:", results);

    return results;
  } catch (error) {
    console.log("Medicine search error:", error);
    return [];
  }
}

export function getAllCategories() {
  return [
    ...new Set(
      localData
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];
}
