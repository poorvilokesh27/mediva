import medicineData from "../data/medicineData.json";
import medicineCatalog from "../data/medicineCatalog.json";

export async function searchMedicines(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return [];
  }

  try {
    // Search the disease/condition database
    const diseaseResults = medicineData.filter((item) => {
      const disease = item.disease?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";

      const symptoms = Array.isArray(item.symptoms)
        ? item.symptoms
        : [];

      const medicines = Array.isArray(item.medicines)
        ? item.medicines
        : [];

      return (
        disease.includes(q) ||
        category.includes(q) ||
        symptoms.some((symptom) =>
          String(symptom).toLowerCase().includes(q)
        ) ||
        medicines.some((medicine) =>
          String(medicine?.name || "")
            .toLowerCase()
            .includes(q)
        )
      );
    });

    // Search the medicine catalog
    const catalogResults = medicineCatalog.filter((medicine) => {
      const name = medicine.name?.toLowerCase() || "";
      const category = medicine.category?.toLowerCase() || "";

      const usedFor = Array.isArray(medicine.usedFor)
        ? medicine.usedFor
        : [];

      const relatedConditions = Array.isArray(
        medicine.relatedConditions
      )
        ? medicine.relatedConditions
        : [];

      return (
        name.includes(q) ||
        category.includes(q) ||
        usedFor.some((item) =>
          String(item).toLowerCase().includes(q)
        ) ||
        relatedConditions.some((item) =>
          String(item).toLowerCase().includes(q)
        )
      );
    });

    console.log("Search:", q);
    console.log("Disease results:", diseaseResults);
    console.log("Medicine results:", catalogResults);

    // Convert catalog medicines into the same basic shape
    // expected by the existing MedicineDetailScreen.
    const convertedCatalogResults = catalogResults.map(
      (medicine) => ({
        id: medicine.id,
        disease: medicine.name,
        category: medicine.category,
        symptoms: medicine.usedFor || [],
        medicines: [
          {
            name: medicine.name,
            notes: medicine.precautions || "",
          },
        ],
        precautions: medicine.precautions || "",
        disclaimer:
          "General educational information only. This is not a prescription.",
        image: medicine.image,
        forms: medicine.forms || [],
        relatedConditions:
          medicine.relatedConditions || [],
        whenToSeekHelp:
          medicine.whenToSeekHelp || "",
      })
    );

    // Combine both databases without duplicates
    const combined = [
      ...diseaseResults,
      ...convertedCatalogResults,
    ];

    const uniqueResults = combined.filter(
      (item, index, array) =>
        index ===
        array.findIndex(
          (other) =>
            other.disease?.toLowerCase() ===
            item.disease?.toLowerCase()
        )
    );

    return uniqueResults;
  } catch (error) {
    console.log("Medicine search error:", error);
    return [];
  }
}

export function getAllCategories() {
  const diseaseCategories = medicineData
    .map((item) => item.category)
    .filter(Boolean);

  const medicineCategories = medicineCatalog
    .map((item) => item.category)
    .filter(Boolean);

  return [
    ...new Set([
      ...diseaseCategories,
      ...medicineCategories,
    ]),
  ];
}