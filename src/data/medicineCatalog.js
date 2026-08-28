// src/data/medicineCatalog.js

const medicineCatalog = [

  // =====================================================
  // ALLERGY RELIEF
  // =====================================================

  {
    name: "Cetirizine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery or itchy eyes",
      "Allergy-related itching",
    ],
    uses:
      "Used to relieve allergy symptoms such as sneezing, runny nose, itchy nose, and itchy or watery eyes.",
    details:
      "Cetirizine is an antihistamine commonly used for symptoms caused by allergic reactions.",
    precautions:
      "May cause drowsiness in some people. Follow the advice of a doctor or pharmacist.",
  },

  {
    name: "Loratadine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery eyes",
      "Itchy eyes",
    ],
    uses:
      "Used for allergic rhinitis, sneezing, runny nose, and itchy or watery eyes.",
    details:
      "Loratadine is an antihistamine used to help relieve common allergy symptoms.",
    precautions:
      "Usually causes less drowsiness than older antihistamines, but individual reactions can vary.",
  },

  {
    name: "Fexofenadine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy eyes",
      "Watery eyes",
      "Hives",
      "Skin itching",
    ],
    uses:
      "Used to relieve symptoms of seasonal allergies and hives.",
    details:
      "Fexofenadine is an antihistamine used for certain allergic conditions, including seasonal allergies and hives.",
    precautions:
      "Take only as directed. Ask a healthcare professional if you take other medicines.",
  },

  {
    name: "Desloratadine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery eyes",
      "Itchy eyes",
    ],
    uses:
      "Used for allergic rhinitis and allergy-related symptoms.",
    details:
      "Desloratadine is an antihistamine used to relieve symptoms associated with allergic rhinitis.",
    precautions:
      "Follow recommended directions and seek professional advice if symptoms persist.",
  },

  {
    name: "Levocetirizine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery eyes",
      "Skin itching",
      "Hives",
    ],
    uses:
      "Used to relieve symptoms caused by allergies and hives.",
    details:
      "Levocetirizine is an antihistamine used for certain allergy symptoms and hives.",
    precautions:
      "Can cause drowsiness in some people.",
  },

  {
    name: "Acrivastine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery eyes",
      "Allergy-related itching",
    ],
    uses:
      "Used for short-term relief of allergy symptoms.",
    details:
      "Acrivastine is an antihistamine used for short-term relief of certain allergy symptoms.",
    precautions:
      "May cause drowsiness. Follow product instructions.",
  },

  {
    name: "Diphenhydramine",
    category: "Allergy",
    subcategory: "First-generation antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itching",
      "Watery eyes",
      "Allergic skin reactions",
    ],
    uses:
      "Used for allergy symptoms and itching.",
    details:
      "Diphenhydramine is an antihistamine that can relieve certain allergy and itching symptoms.",
    precautions:
      "Can cause significant drowsiness. Follow healthcare professional advice.",
  },

  {
    name: "Chlorpheniramine",
    category: "Allergy",
    subcategory: "First-generation antihistamine",
    symptoms: [
      "Sneezing",
      "Runny nose",
      "Itchy nose",
      "Watery eyes",
      "Allergy symptoms",
    ],
    uses:
      "Used to relieve sneezing, runny nose, and other allergy symptoms.",
    details:
      "Chlorpheniramine is an antihistamine used to relieve certain allergy symptoms.",
    precautions:
      "May cause drowsiness.",
  },

  {
    name: "Hydroxyzine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Allergy-related itching",
      "Skin itching",
      "Certain allergic symptoms",
    ],
    uses:
      "Used for itching associated with certain allergic conditions.",
    details:
      "Hydroxyzine is an antihistamine that may be used for itching associated with certain allergic conditions.",
    precautions:
      "Can cause drowsiness. It is commonly prescribed by healthcare professionals.",
  },

  {
    name: "Promethazine",
    category: "Allergy",
    subcategory: "Antihistamine",
    symptoms: [
      "Certain allergy symptoms",
      "Sneezing",
      "Runny nose",
      "Itching",
    ],
    uses:
      "Used for certain allergy symptoms and other conditions.",
    details:
      "Promethazine is an antihistamine used for certain allergic symptoms and other medical conditions.",
    precautions:
      "Can cause substantial drowsiness. Use only according to professional advice.",
  },

  // =====================================================
  // PAIN & FEVER
  // =====================================================

  {
    name: "Paracetamol",
    category: "Pain & Fever",
    subcategory: "Analgesic / Antipyretic",
    symptoms: [
      "Fever",
      "Headache",
      "Mild muscle pain",
      "Mild body pain",
      "Toothache",
    ],
    uses:
      "Used to reduce fever and relieve mild to moderate pain.",
    details:
      "Paracetamol is commonly used for temporary relief of pain and fever.",
    precautions:
      "Taking more than the recommended amount can cause serious liver damage.",
  },

  {
    name: "Ibuprofen",
    category: "Pain & Inflammation",
    subcategory: "NSAID",
    symptoms: [
      "Pain",
      "Fever",
      "Muscle pain",
      "Joint pain",
      "Inflammation",
    ],
    uses:
      "Used for pain, fever, and inflammation.",
    details:
      "Ibuprofen is a non-steroidal anti-inflammatory medicine used for certain painful and inflammatory conditions.",
    precautions:
      "May cause stomach irritation and is not suitable for everyone.",
  },

  {
    name: "Naproxen",
    category: "Pain & Inflammation",
    subcategory: "NSAID",
    symptoms: [
      "Pain",
      "Joint pain",
      "Muscle pain",
      "Inflammation",
    ],
    uses:
      "Used to relieve pain and inflammation.",
    details:
      "Naproxen is an NSAID used for certain painful and inflammatory conditions.",
    precautions:
      "Can affect the stomach, kidneys, and cardiovascular system in some people.",
  },

  {
    name: "Aspirin",
    category: "Pain & Inflammation",
    subcategory: "NSAID / Antiplatelet",
    symptoms: [
      "Certain types of pain",
      "Fever",
      "Inflammation",
    ],
    uses:
      "Used for certain types of pain and, under medical supervision, to reduce blood clot formation.",
    details:
      "Aspirin has pain-relieving and anti-inflammatory effects and is also used medically as an antiplatelet medicine.",
    precautions:
      "Not appropriate for everyone. Children and teenagers should not use aspirin for viral illnesses unless specifically directed by a healthcare professional.",
  },

  {
    name: "Diclofenac",
    category: "Pain & Inflammation",
    subcategory: "NSAID",
    symptoms: [
      "Joint pain",
      "Muscle pain",
      "Inflammation",
      "Pain from certain conditions",
    ],
    uses:
      "Used to relieve pain and inflammation.",
    details:
      "Diclofenac is an NSAID used to relieve pain and inflammation.",
    precautions:
      "Can have stomach, kidney, and cardiovascular side effects.",
  },

  {
    name: "Ketoprofen",
    category: "Pain & Inflammation",
    subcategory: "NSAID",
    symptoms: [
      "Pain",
      "Joint pain",
      "Muscle pain",
      "Inflammation",
    ],
    uses:
      "Used for pain and inflammation.",
    details:
      "Ketoprofen is an NSAID used for certain painful and inflammatory conditions.",
    precautions:
      "Follow professional guidance because NSAIDs can have important side effects.",
  },

  {
    name: "Celecoxib",
    category: "Pain & Inflammation",
    subcategory: "COX-2 inhibitor",
    symptoms: [
      "Joint pain",
      "Inflammation",
      "Certain arthritis-related symptoms",
    ],
    uses:
      "Used for certain inflammatory and painful conditions.",
    details:
      "Celecoxib is a selective COX-2 inhibitor used for certain painful and inflammatory conditions.",
    precautions:
      "Usually prescribed according to individual medical circumstances.",
  },

  // =====================================================
  // ANTIBACTERIALS
  // =====================================================

  {
    name: "Amoxicillin",
    category: "Anti-Infectives",
    subcategory: "Antibacterial",
    symptoms: [
      "Symptoms caused by certain bacterial infections",
      "Sore throat from certain bacterial infections",
      "Certain respiratory infection symptoms",
    ],
    uses:
      "Antibiotic used to treat certain bacterial infections.",
    details:
      "Amoxicillin is a penicillin-type antibiotic used against susceptible bacterial infections.",
    precautions:
      "Antibiotics do not treat viral infections. Use only when prescribed or appropriately recommended.",
  },

  {
    name: "Ampicillin",
    category: "Anti-Infectives",
    subcategory: "Antibacterial",
    symptoms: [
      "Symptoms caused by certain bacterial infections",
      "Certain respiratory infections",
      "Certain urinary infections",
    ],
    uses:
      "Used to treat certain bacterial infections.",
    details:
      "Ampicillin is a penicillin-type antibiotic used for certain bacterial infections.",
    precautions:
      "Use only according to professional medical advice.",
  },

  {
    name: "Azithromycin",
    category: "Anti-Infectives",
    subcategory: "Macrolide antibiotic",
    symptoms: [
      "Certain bacterial respiratory infection symptoms",
      "Certain throat infections",
      "Certain skin infection symptoms",
    ],
    uses:
      "Used for certain bacterial infections.",
    details:
      "Azithromycin is a macrolide antibiotic used for selected bacterial infections.",
    precautions:
      "Should not be used unnecessarily because inappropriate antibiotic use contributes to resistance.",
  },

  {
    name: "Clarithromycin",
    category: "Anti-Infectives",
    subcategory: "Macrolide antibiotic",
    symptoms: [
      "Certain bacterial respiratory symptoms",
      "Certain throat infection symptoms",
      "Certain bacterial infection symptoms",
    ],
    uses:
      "Used to treat certain bacterial infections.",
    details:
      "Clarithromycin is a macrolide antibiotic used for selected bacterial infections.",
    precautions:
      "Can interact with other medicines.",
  },

  {
    name: "Cephalexin",
    category: "Anti-Infectives",
    subcategory: "Cephalosporin",
    symptoms: [
      "Symptoms caused by certain bacterial infections",
      "Certain skin infection symptoms",
      "Certain urinary infection symptoms",
    ],
    uses:
      "Used for certain bacterial infections.",
    details:
      "Cephalexin is a cephalosporin antibiotic used for certain bacterial infections.",
    precautions:
      "Tell a healthcare professional about previous antibiotic allergies.",
  },

  {
    name: "Cefuroxime",
    category: "Anti-Infectives",
    subcategory: "Cephalosporin",
    symptoms: [
      "Certain bacterial infection symptoms",
      "Certain respiratory infection symptoms",
      "Certain urinary infection symptoms",
    ],
    uses:
      "Used for certain bacterial infections.",
    details:
      "Cefuroxime is a cephalosporin antibiotic used for selected bacterial infections.",
    precautions:
      "Use only when appropriately prescribed.",
  },

  {
    name: "Ceftriaxone",
    category: "Anti-Infectives",
    subcategory: "Cephalosporin",
    symptoms: [
      "Symptoms of certain serious bacterial infections",
      "Fever associated with certain bacterial infections",
    ],
    uses:
      "Used for serious bacterial infections in appropriate medical settings.",
    details:
      "Ceftriaxone is a cephalosporin antibiotic generally used for serious bacterial infections.",
    precautions:
      "Usually administered by healthcare professionals.",
  },

  {
    name: "Doxycycline",
    category: "Anti-Infectives",
    subcategory: "Tetracycline antibiotic",
    symptoms: [
      "Symptoms caused by certain bacterial infections",
      "Certain respiratory infection symptoms",
      "Certain skin infection symptoms",
    ],
    uses:
      "Used for several types of bacterial infections and some other conditions.",
    details:
      "Doxycycline is a tetracycline antibiotic used for selected bacterial infections.",
    precautions:
      "Requires appropriate professional guidance.",
  },

  {
    name: "Ciprofloxacin",
    category: "Anti-Infectives",
    subcategory: "Fluoroquinolone",
    symptoms: [
      "Symptoms caused by selected bacterial infections",
      "Certain urinary infection symptoms",
      "Certain gastrointestinal infection symptoms",
    ],
    uses:
      "Used for selected bacterial infections.",
    details:
      "Ciprofloxacin is a fluoroquinolone antibiotic reserved for appropriate bacterial infections.",
    precautions:
      "Can have important side effects and should be used only when appropriate.",
  },

  {
    name: "Metronidazole",
    category: "Anti-Infectives",
    subcategory: "Antibacterial / Antiprotozoal",
    symptoms: [
      "Symptoms caused by certain bacterial infections",
      "Certain gastrointestinal infection symptoms",
      "Certain protozoal infection symptoms",
    ],
    uses:
      "Used for certain bacterial and protozoal infections.",
    details:
      "Metronidazole acts against certain bacteria and protozoa.",
    precautions:
      "Use according to professional instructions.",
  },

  {
    name: "Vancomycin",
    category: "Anti-Infectives",
    subcategory: "Glycopeptide antibiotic",
    symptoms: [
      "Symptoms of certain serious bacterial infections",
      "Fever associated with certain serious infections",
    ],
    uses:
      "Used for certain serious bacterial infections.",
    details:
      "Vancomycin is a glycopeptide antibiotic generally used for serious susceptible bacterial infections.",
    precautions:
      "Generally administered and monitored by healthcare professionals.",
  },

  // =====================================================
  // ANTIVIRALS
  // =====================================================

  {
    name: "Acyclovir",
    category: "Anti-Infectives",
    subcategory: "Antiviral",
    symptoms: [
      "Certain herpes-related skin lesions",
      "Pain or discomfort associated with certain herpes infections",
      "Cold sore symptoms",
    ],
    uses:
      "Used for certain herpes virus infections.",
    details:
      "Acyclovir is an antiviral medicine active against certain herpes viruses.",
    precautions:
      "Works against specific viruses and should be used according to medical advice.",
  },

  {
    name: "Valacyclovir",
    category: "Anti-Infectives",
    subcategory: "Antiviral",
    symptoms: [
      "Certain herpes-related lesions",
      "Cold sore symptoms",
      "Certain genital herpes symptoms",
    ],
    uses:
      "Used for certain herpes virus infections.",
    details:
      "Valacyclovir is converted to acyclovir in the body and is used for certain herpes virus infections.",
    precautions:
      "Follow the prescribed directions.",
  },

  {
    name: "Oseltamivir",
    category: "Anti-Infectives",
    subcategory: "Antiviral",
    symptoms: [
      "Influenza fever",
      "Cough",
      "Sore throat",
      "Body aches",
      "Fatigue",
    ],
    uses:
      "Used for treatment or prevention of influenza in appropriate circumstances.",
    details:
      "Oseltamivir is an antiviral medicine used for influenza in appropriate circumstances.",
    precautions:
      "Effectiveness is greatest when started promptly after symptoms begin.",
  },

  // =====================================================
  // ANTIFUNGALS
  // =====================================================

  {
    name: "Fluconazole",
    category: "Anti-Infectives",
    subcategory: "Antifungal",
    symptoms: [
      "Symptoms caused by certain fungal infections",
      "Certain fungal skin symptoms",
      "Certain yeast infection symptoms",
    ],
    uses:
      "Used to treat certain fungal infections.",
    details:
      "Fluconazole is an antifungal medicine used for selected fungal infections.",
    precautions:
      "Can interact with other medicines.",
  },

  {
    name: "Itraconazole",
    category: "Anti-Infectives",
    subcategory: "Antifungal",
    symptoms: [
      "Symptoms caused by certain fungal infections",
      "Certain skin fungal symptoms",
      "Certain nail fungal symptoms",
    ],
    uses:
      "Used for certain fungal infections.",
    details:
      "Itraconazole is an antifungal medicine used for selected fungal infections.",
    precautions:
      "Requires professional guidance because of drug interactions and other precautions.",
  },

  {
    name: "Clotrimazole",
    category: "Anti-Infectives",
    subcategory: "Antifungal",
    symptoms: [
      "Itching caused by certain fungal infections",
      "Redness",
      "Skin irritation",
      "Certain fungal skin symptoms",
    ],
    uses:
      "Used for certain fungal infections, commonly involving the skin or mucous membranes.",
    details:
      "Clotrimazole is an antifungal medicine commonly used for certain fungal infections.",
    precautions:
      "Use according to product or professional instructions.",
  },

  {
    name: "Terbinafine",
    category: "Anti-Infectives",
    subcategory: "Antifungal",
    symptoms: [
      "Fungal skin infection symptoms",
      "Itching",
      "Skin scaling",
      "Certain nail fungal symptoms",
    ],
    uses:
      "Used for certain fungal infections of the skin and nails.",
    details:
      "Terbinafine is an antifungal medicine used for certain fungal infections.",
    precautions:
      "Some forms require medical supervision.",
  },

  // =====================================================
  // CARDIOVASCULAR
  // =====================================================

  {
    name: "Amlodipine",
    category: "Cardiovascular",
    subcategory: "Calcium Channel Blocker",
    symptoms: [
      "High blood pressure",
      "Certain types of chest pain",
    ],
    uses:
      "Used to help control high blood pressure and certain types of chest pain.",
    details:
      "Amlodipine is a calcium channel blocker used for high blood pressure and certain types of angina.",
    precautions:
      "Use according to a healthcare professional's instructions.",
  },

  {
    name: "Losartan",
    category: "Cardiovascular",
    subcategory: "ARB",
    symptoms: [
      "High blood pressure",
      "Certain cardiovascular conditions",
      "Certain kidney-related conditions",
    ],
    uses:
      "Used to treat high blood pressure and certain cardiovascular or kidney-related conditions.",
    details:
      "Losartan is an angiotensin receptor blocker used for selected cardiovascular and kidney-related conditions.",
    precautions:
      "Requires professional monitoring in appropriate patients.",
  },

  {
    name: "Enalapril",
    category: "Cardiovascular",
    subcategory: "ACE inhibitor",
    symptoms: [
      "High blood pressure",
      "Certain heart conditions",
    ],
    uses:
      "Used for high blood pressure and certain heart conditions.",
    details:
      "Enalapril is an ACE inhibitor used for high blood pressure and certain heart conditions.",
    precautions:
      "May cause cough and requires medical monitoring.",
  },

  {
    name: "Metoprolol",
    category: "Cardiovascular",
    subcategory: "Beta blocker",
    symptoms: [
      "High blood pressure",
      "Certain heart rhythm problems",
      "Certain heart-related symptoms",
    ],
    uses:
      "Used for certain heart conditions and high blood pressure.",
    details:
      "Metoprolol is a beta blocker used for selected cardiovascular conditions.",
    precautions:
      "Can lower heart rate and blood pressure.",
  },

  {
    name: "Atenolol",
    category: "Cardiovascular",
    subcategory: "Beta blocker",
    symptoms: [
      "High blood pressure",
      "Certain heart conditions",
      "Certain heart-related symptoms",
    ],
    uses:
      "Used for high blood pressure and certain heart conditions.",
    details:
      "Atenolol is a beta blocker used for selected cardiovascular conditions.",
    precautions:
      "Should not be stopped suddenly without professional advice.",
  },

  {
    name: "Furosemide",
    category: "Cardiovascular",
    subcategory: "Diuretic",
    symptoms: [
      "Fluid retention",
      "Swelling",
      "Certain heart-related fluid buildup",
    ],
    uses:
      "Helps the body remove excess fluid and is used in certain heart, kidney, and blood-pressure conditions.",
    details:
      "Furosemide is a diuretic that helps the body remove excess fluid.",
    precautions:
      "Can affect fluid and electrolyte levels.",
  },

  {
    name: "Atorvastatin",
    category: "Cardiovascular",
    subcategory: "Statin",
    symptoms: [
      "High cholesterol",
      "High LDL cholesterol",
    ],
    uses:
      "Used to lower cholesterol and reduce cardiovascular risk.",
    details:
      "Atorvastatin is a statin medicine used to lower cholesterol and reduce cardiovascular risk.",
    precautions:
      "Requires appropriate medical monitoring.",
  },

  {
    name: "Rosuvastatin",
    category: "Cardiovascular",
    subcategory: "Statin",
    symptoms: [
      "High cholesterol",
      "High LDL cholesterol",
    ],
    uses:
      "Used to lower LDL cholesterol.",
    details:
      "Rosuvastatin is a statin medicine used to lower cholesterol.",
    precautions:
      "Use according to professional advice.",
  },

  {
    name: "Clopidogrel",
    category: "Cardiovascular",
    subcategory: "Antiplatelet",
    symptoms: [
      "Certain cardiovascular conditions",
      "Risk of blood clot formation",
    ],
    uses:
      "Helps prevent blood clots in certain cardiovascular conditions.",
    details:
      "Clopidogrel is an antiplatelet medicine used to reduce the risk of certain blood clots.",
    precautions:
      "Increases bleeding risk.",
  },

  {
    name: "Warfarin",
    category: "Cardiovascular",
    subcategory: "Anticoagulant",
    symptoms: [
      "Conditions associated with harmful blood clot formation",
      "Certain clotting disorders",
    ],
    uses:
      "Used to reduce the formation of harmful blood clots.",
    details:
      "Warfarin is an anticoagulant used for selected conditions where reducing blood clot formation is needed.",
    precautions:
      "Requires regular medical monitoring and has many medicine and food interactions.",
  },

  // =====================================================
  // CNS
  // =====================================================

  {
    name: "Fluoxetine",
    category: "CNS",
    subcategory: "Antidepressant",
    symptoms: [
      "Symptoms associated with certain depressive conditions",
      "Certain mood-related symptoms",
    ],
    uses:
      "Used for certain depressive and other psychiatric conditions.",
    details:
      "Fluoxetine is an SSRI antidepressant used for certain mental health conditions.",
    precautions:
      "Should be used under appropriate professional supervision.",
  },

  {
    name: "Sertraline",
    category: "CNS",
    subcategory: "Antidepressant",
    symptoms: [
      "Depressive symptoms",
      "Certain anxiety-related symptoms",
    ],
    uses:
      "Used for depression and certain anxiety-related conditions.",
    details:
      "Sertraline is an SSRI antidepressant used for depression and certain anxiety-related conditions.",
    precautions:
      "Use only under professional guidance.",
  },

  {
    name: "Escitalopram",
    category: "CNS",
    subcategory: "Antidepressant",
    symptoms: [
      "Depressive symptoms",
      "Certain anxiety symptoms",
    ],
    uses:
      "Used for depression and certain anxiety disorders.",
    details:
      "Escitalopram is an SSRI antidepressant used for depression and certain anxiety disorders.",
    precautions:
      "Requires professional guidance.",
  },

  {
    name: "Amitriptyline",
    category: "CNS",
    subcategory: "Tricyclic antidepressant",
    symptoms: [
      "Certain depressive symptoms",
      "Certain nerve pain",
      "Certain chronic pain conditions",
    ],
    uses:
      "Used for certain depressive conditions and some types of nerve pain.",
    details:
      "Amitriptyline is a tricyclic antidepressant that is also used in some situations for nerve pain.",
    precautions:
      "Can cause drowsiness and other side effects.",
  },

  {
    name: "Gabapentin",
    category: "CNS",
    subcategory: "Anticonvulsant",
    symptoms: [
      "Certain nerve pain",
      "Certain seizure-related symptoms",
    ],
    uses:
      "Used for certain seizure disorders and nerve pain.",
    details:
      "Gabapentin is an anticonvulsant medicine also used for certain types of nerve pain.",
    precautions:
      "Can cause dizziness or drowsiness.",
  },

  {
    name: "Pregabalin",
    category: "CNS",
    subcategory: "Anticonvulsant",
    symptoms: [
      "Certain nerve pain",
      "Certain seizure-related symptoms",
    ],
    uses:
      "Used for certain nerve pain conditions and seizure disorders.",
    details:
      "Pregabalin is an anticonvulsant used for certain nerve pain conditions and seizure disorders.",
    precautions:
      "May cause dizziness or drowsiness and requires professional guidance.",
  },

  {
    name: "Levetiracetam",
    category: "CNS",
    subcategory: "Anticonvulsant",
    symptoms: [
      "Certain seizure-related symptoms",
      "Seizure disorders",
    ],
    uses:
      "Used to help control certain seizure disorders.",
    details:
      "Levetiracetam is an anticonvulsant used to help control certain seizure disorders.",
    precautions:
      "Use under medical supervision.",
  },

  {
    name: "Topiramate",
    category: "CNS",
    subcategory: "Anticonvulsant",
    symptoms: [
      "Certain seizure-related symptoms",
      "Migraine episodes",
    ],
    uses:
      "Used for certain seizure disorders and migraine prevention.",
    details:
      "Topiramate is an anticonvulsant that is also used for migraine prevention.",
    precautions:
      "Requires professional guidance.",
  },

  {
    name: "Lithium",
    category: "CNS",
    subcategory: "Mood stabilizer",
    symptoms: [
      "Certain mood-related symptoms",
      "Certain mood disorder symptoms",
    ],
    uses:
      "Used for certain mood disorders.",
    details:
      "Lithium is a mood stabilizer used for certain mood disorders and requires medical monitoring.",
    precautions:
      "Requires regular medical monitoring because the safe and effective amount is closely controlled.",
  },

  // =====================================================
  // GASTROINTESTINAL
  // =====================================================

  {
    name: "Omeprazole",
    category: "Gastrointestinal",
    subcategory: "Proton Pump Inhibitor",
    symptoms: [
      "Heartburn",
      "Acid reflux",
      "Stomach acid-related discomfort",
    ],
    uses:
      "Reduces stomach acid and is used for conditions such as acid reflux and certain ulcers.",
    details:
      "Omeprazole is a proton pump inhibitor that reduces stomach acid production.",
    precautions:
      "Long-term use should be discussed with a healthcare professional.",
  },

  {
    name: "Pantoprazole",
    category: "Gastrointestinal",
    subcategory: "Proton Pump Inhibitor",
    symptoms: [
      "Heartburn",
      "Acid reflux",
      "Acid-related digestive discomfort",
    ],
    uses:
      "Reduces stomach acid and is used for acid-related digestive conditions.",
    details:
      "Pantoprazole is a proton pump inhibitor that reduces stomach acid.",
    precautions:
      "Use according to professional advice.",
  },

  {
    name: "Famotidine",
    category: "Gastrointestinal",
    subcategory: "H2 blocker",
    symptoms: [
      "Heartburn",
      "Acid reflux",
      "Acid-related stomach discomfort",
    ],
    uses:
      "Reduces stomach acid and helps with certain heartburn and acid-related conditions.",
    details:
      "Famotidine is an H2 blocker that reduces stomach acid production.",
    precautions:
      "Ask a healthcare professional if symptoms persist.",
  },

  {
    name: "Ondansetron",
    category: "Gastrointestinal",
    subcategory: "Antiemetic",
    symptoms: [
      "Nausea",
      "Vomiting",
    ],
    uses:
      "Used to prevent or reduce certain types of nausea and vomiting.",
    details:
      "Ondansetron is an antiemetic medicine used to prevent or reduce certain types of nausea and vomiting.",
    precautions:
      "Usually used according to professional guidance.",
  },

  {
    name: "Domperidone",
    category: "Gastrointestinal",
    subcategory: "Antiemetic / Prokinetic",
    symptoms: [
      "Nausea",
      "Vomiting",
      "Certain digestive symptoms",
    ],
    uses:
      "Used in certain situations for nausea and vomiting or digestive symptoms.",
    details:
      "Domperidone is used in selected situations for nausea, vomiting, or digestive symptoms.",
    precautions:
      "Can affect heart rhythm in some people and should be used only when appropriate.",
  },

  {
    name: "Loperamide",
    category: "Gastrointestinal",
    subcategory: "Antidiarrheal",
    symptoms: [
      "Diarrhea",
      "Loose stools",
    ],
    uses:
      "Used for short-term control of certain types of diarrhea.",
    details:
      "Loperamide is an antidiarrheal medicine used for short-term control of certain diarrhea.",
    precautions:
      "Do not use for certain types of severe or infectious diarrhea without medical advice.",
  },

  {
    name: "Bisacodyl",
    category: "Gastrointestinal",
    subcategory: "Laxative",
    symptoms: [
      "Constipation",
      "Difficulty passing stools",
    ],
    uses:
      "Used for short-term relief of constipation.",
    details:
      "Bisacodyl is a stimulant laxative used for short-term relief of constipation.",
    precautions:
      "Avoid prolonged self-use without professional advice.",
  },

  {
    name: "Lactulose",
    category: "Gastrointestinal",
    subcategory: "Osmotic laxative",
    symptoms: [
      "Constipation",
      "Difficulty passing stools",
    ],
    uses:
      "Used to relieve constipation and for certain liver-related conditions.",
    details:
      "Lactulose is an osmotic laxative used to relieve constipation and for selected liver-related conditions.",
    precautions:
      "May cause gas or abdominal discomfort.",
  },

  // =====================================================
  // RESPIRATORY
  // =====================================================

  {
    name: "Salbutamol",
    category: "Respiratory",
    subcategory: "Bronchodilator",
    symptoms: [
      "Wheezing",
      "Shortness of breath",
      "Breathing difficulty associated with certain airway conditions",
    ],
    uses:
      "Relaxes airway muscles and provides relief from certain asthma or breathing symptoms.",
    details:
      "Salbutamol is a bronchodilator that relaxes airway muscles.",
    precautions:
      "Use according to the prescribed or recommended instructions.",
  },

  {
    name: "Budesonide",
    category: "Respiratory",
    subcategory: "Corticosteroid",
    symptoms: [
      "Airway inflammation",
      "Certain asthma symptoms",
      "Certain respiratory symptoms",
    ],
    uses:
      "Reduces airway inflammation in certain respiratory conditions.",
    details:
      "Budesonide is a corticosteroid that reduces inflammation in the airways.",
    precautions:
      "Regular use should follow professional instructions.",
  },

  {
    name: "Fluticasone",
    category: "Respiratory",
    subcategory: "Corticosteroid",
    symptoms: [
      "Airway inflammation",
      "Certain respiratory symptoms",
      "Certain allergy-related nasal symptoms",
    ],
    uses:
      "Reduces inflammation in certain respiratory or allergic conditions.",
    details:
      "Fluticasone is a corticosteroid used for certain respiratory or allergic conditions.",
    precautions:
      "Use according to product or professional instructions.",
  },

  {
    name: "Ipratropium",
    category: "Respiratory",
    subcategory: "Anticholinergic bronchodilator",
    symptoms: [
      "Wheezing",
      "Breathing difficulty",
      "Certain airway symptoms",
    ],
    uses:
      "Helps relax the airways in certain respiratory conditions.",
    details:
      "Ipratropium is a bronchodilator that helps relax the airways.",
    precautions:
      "Use as directed by a healthcare professional.",
  },

  {
    name: "Montelukast",
    category: "Respiratory",
    subcategory: "Leukotriene modifier",
    symptoms: [
      "Asthma-related airway symptoms",
      "Wheezing",
      "Certain allergy symptoms",
    ],
    uses:
      "Used for asthma prevention and certain allergy symptoms.",
    details:
      "Montelukast is a leukotriene modifier used for asthma prevention and certain allergy symptoms.",
    precautions:
      "Has important mental-health-related warnings; discuss its use with a healthcare professional.",
  },

  {
    name: "Guaifenesin",
    category: "Respiratory",
    subcategory: "Expectorant",
    symptoms: [
      "Chest congestion",
      "Mucus",
      "Wet or productive cough",
    ],
    uses:
      "Helps loosen mucus so it can be cleared more easily.",
    details:
      "Guaifenesin is an expectorant that helps loosen mucus in the airways.",
    precautions:
      "Drink fluids as appropriate and follow package directions.",
  },

  {
    name: "Dextromethorphan",
    category: "Respiratory",
    subcategory: "Antitussive",
    symptoms: [
      "Dry cough",
      "Cough",
    ],
    uses:
      "Used to temporarily suppress certain coughs.",
    details:
      "Dextromethorphan is a cough suppressant used for temporary relief of certain coughs.",
    precautions:
      "Can interact with some medicines.",
  },

  // =====================================================
  // ENDOCRINE & METABOLIC
  // =====================================================

  {
    name: "Metformin",
    category: "Endocrine & Metabolic",
    subcategory: "Biguanide",
    symptoms: [
      "High blood glucose",
      "Type 2 diabetes-related blood glucose elevation",
    ],
    uses:
      "Used to help control blood glucose in type 2 diabetes.",
    details:
      "Metformin is a biguanide medicine used to help control blood glucose in type 2 diabetes.",
    precautions:
      "Use according to professional medical advice.",
  },

  {
    name: "Sitagliptin",
    category: "Endocrine & Metabolic",
    subcategory: "DPP-4 inhibitor",
    symptoms: [
      "High blood glucose",
      "Type 2 diabetes-related blood glucose elevation",
    ],
    uses:
      "Used to help control blood glucose in type 2 diabetes.",
    details:
      "Sitagliptin is a DPP-4 inhibitor used to help control blood glucose in type 2 diabetes.",
    precautions:
      "Requires appropriate medical guidance.",
  },

  {
    name: "Semaglutide",
    category: "Endocrine & Metabolic",
    subcategory: "GLP-1 receptor agonist",
    symptoms: [
      "High blood glucose",
      "Type 2 diabetes-related blood glucose elevation",
    ],
    uses:
      "Used for certain diabetes and weight-management indications depending on the formulation.",
    details:
      "Semaglutide is a GLP-1 receptor agonist used for certain approved diabetes and weight-management indications.",
    precautions:
      "Requires professional guidance and is not suitable for everyone.",
  },

  {
    name: "Empagliflozin",
    category: "Endocrine & Metabolic",
    subcategory: "SGLT2 inhibitor",
    symptoms: [
      "High blood glucose",
      "Type 2 diabetes-related blood glucose elevation",
      "Certain cardiovascular or kidney-related conditions",
    ],
    uses:
      "Used for certain people with type 2 diabetes and some cardiovascular or kidney conditions.",
    details:
      "Empagliflozin is an SGLT2 inhibitor used for selected diabetes, cardiovascular, and kidney-related conditions.",
    precautions:
      "Requires professional guidance.",
  },

  {
    name: "Glimepiride",
    category: "Endocrine & Metabolic",
    subcategory: "Sulfonylurea",
    symptoms: [
      "High blood glucose",
      "Type 2 diabetes-related blood glucose elevation",
    ],
    uses:
      "Used to help lower blood glucose in type 2 diabetes.",
    details:
      "Glimepiride is a sulfonylurea used to help lower blood glucose in type 2 diabetes.",
    precautions:
      "Can cause low blood sugar.",
  },

  // =====================================================
  // ANTI-INFLAMMATORY & GOUT
  // =====================================================

  {
    name: "Allopurinol",
    category: "Anti-Inflammatory & Gout",
    subcategory: "Uric acid lowering medicine",
    symptoms: [
      "High uric acid",
      "Gout-related uric acid buildup",
      "Recurrent gout risk",
    ],
    uses:
      "Used to reduce uric acid levels and prevent gout attacks over time.",
    details:
      "Allopurinol reduces uric acid production and is used for long-term management of high uric acid and gout.",
    precautions:
      "Should be used according to professional advice.",
  },

  {
    name: "Colchicine",
    category: "Anti-Inflammatory & Gout",
    subcategory: "Gout medicine",
    symptoms: [
      "Gout-related joint pain",
      "Joint swelling",
      "Joint inflammation",
    ],
    uses:
      "Used for certain gout attacks and related inflammatory conditions.",
    details:
      "Colchicine is an anti-inflammatory medicine used for certain gout-related inflammatory conditions.",
    precautions:
      "The correct amount is important because excessive amounts can be dangerous.",
  },
];


// =====================================================
// MEDICINE IMAGES
// =====================================================

const medicineImages = {
  Amlodipine: require("../../assets/medicine/amlodipine.png"),
  Cetirizine: require("../../assets/medicine/citirizine.png"),
  Glimepiride: require("../../assets/medicine/glimepiride.png"),
  Ibuprofen: require("../../assets/medicine/ibuprofen.png"),
  Losartan: require("../../assets/medicine/losartan.png"),
  Metformin: require("../../assets/medicine/metformin.png"),
  Omeprazole: require("../../assets/medicine/omeprazole.png"),
  Paracetamol: require("../../assets/medicine/paracetamol.png"),
  Sumatriptan: require("../../assets/medicine/sumatriptan.png"),
};
// =====================================================
// CATEGORY IDs
// =====================================================

const categoryIds = {
  Allergy: "allergy",
  "Pain & Fever": "pain_fever",
  "Pain & Inflammation": "pain_inflammation",
  "Anti-Infectives": "anti_infectives",
  Cardiovascular: "cardiovascular",
  CNS: "cns",
  Gastrointestinal: "gastrointestinal",
  Respiratory: "respiratory",
  "Endocrine & Metabolic": "endocrine_metabolic",
  "Anti-Inflammatory & Gout": "anti_inflammatory_gout",
};


// =====================================================
// FINAL MEDICINE CATALOG
// =====================================================

const finalMedicineCatalog = medicineCatalog.map(
  (medicine, index) => ({
    ...medicine,

    id:
      medicine.id ||
      medicine.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "") ||
      `medicine_${index + 1}`,
  disease:
    medicine.disease ||
    medicine.subcategory ||
    medicine.category ||
    "General condition",

  description:
    medicine.description ||
    medicine.details ||
    medicine.uses ||
    "Information about this medicine.",

  howItWorks:
    medicine.howItWorks ||
    medicine.details ||
    `This medicine is classified as a ${
      medicine.subcategory || "medicine"
    } and is used for appropriate medical conditions.`,

  usedFor:
    Array.isArray(medicine.usedFor)
      ? medicine.usedFor
      : Array.isArray(medicine.symptoms)
      ? medicine.symptoms
      : [medicine.uses || "General use"],

  symptoms:
    Array.isArray(medicine.symptoms)
      ? medicine.symptoms
      : [],

  uses:
    medicine.uses ||
    "Used for appropriate medical conditions.",

  categoryId:
    medicine.categoryId ||
    categoryIds[medicine.category] ||
    "other",

  image:
    medicine.image ||
    medicineImages[medicine.name] ||
    null,
}));


// =====================================================
// EXPORT
// =====================================================

export default finalMedicineCatalog;