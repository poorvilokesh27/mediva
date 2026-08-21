const medicineImages = {
  Paracetamol: require("../../assets/medicine/paracetamol.png"),
  Cetirizine: require("../../assets/medicine/cetirizine.png"),
  Ibuprofen: require("../../assets/medicine/ibuprofen.png"),
  Omeprazole: require("../../assets/medicine/omeprazole.png"),
  Metformin: require("../../assets/medicine/metformin.png"),
  Glimepiride: require("../../assets/medicine/glimepiride.png"),
  Amlodipine: require("../../assets/medicine/amlodipine.png"),
  Losartan: require("../../assets/medicine/losartan.png"),
  Sumatriptan: require("../../assets/medicine/sumatriptan.png"),
};

export function getMedicineImage(name) {
  return medicineImages[name] || null;
}