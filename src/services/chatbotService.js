import localData from "../data/medicineData.json";

// OPTIONAL: plug in a real LLM (Anthropic/OpenAI) here for smarter answers.
// Put your backend proxy URL below - NEVER call the LLM API directly from
// the app with a secret key embedded in the client. Route through your own
// serverless function (e.g. a Supabase Edge Function) that holds the key.
const CHAT_BACKEND_URL = ""; // e.g. "https://YOUR-PROJECT-REF.functions.supabase.co/chat"

export async function askChatbot(message) {
  if (CHAT_BACKEND_URL) {
    try {
      const res = await fetch(CHAT_BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data?.reply) return data.reply;
    } catch (e) {
      // fall through to local rule-based reply
    }
  }
  return ruleBasedReply(message);
}

function ruleBasedReply(message) {
  const q = message.toLowerCase();

  const match = localData.find(
    (item) =>
      q.includes(item.disease.toLowerCase()) ||
      item.symptoms.some((s) => q.includes(s.toLowerCase())) ||
      item.medicines.some((m) => q.includes(m.name.toLowerCase()))
  );

  if (match) {
    const medsList = match.medicines
      .map((m) => `- ${m.name} (${m.dosage}) - ${m.notes}`)
      .join("\n");
    return (
      `Here's what I found on ${match.disease}:\n\n` +
      `Common symptoms: ${match.symptoms.join(", ")}\n\n` +
      `Typical medicines:\n${medsList}\n\n` +
      `Precaution: ${match.precautions}\n\n` +
      `Note: ${match.disclaimer} Please consult a doctor before starting any medication.`
    );
  }

  if (q.includes("hello") || q.includes("hi")) {
    return "Hi! I'm MediPal's assistant. Ask me about a disease, symptom, or medicine, and I'll share general information.";
  }

  return "I don't have specific information on that yet. Try asking about a disease name, a symptom, or a medicine name. Remember, always consult a licensed doctor for diagnosis and treatment.";
}
