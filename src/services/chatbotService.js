import { supabase } from "../config/supabase";

// =====================================================
// MEDIPAL GEMINI AI CHATBOT
// =====================================================

export async function askChatbot(message) {
  try {
    const text = String(message || "").trim();

    if (!text) {
      return "Please type a question.";
    }

    console.log("🔥 GEMINI CHATBOT SERVICE CALLED 🔥");
    console.log("🔥 USER MESSAGE:", text);

    const { data, error } =
      await supabase.functions.invoke("geminie-medipal-", {
        body: {
          message: text,
        },
      });

    console.log("🔥 SUPABASE DATA:", data);
    console.log("🔥 SUPABASE ERROR:", error);

    if (error) {
      console.log(
        "MEDIPAL GEMINI FUNCTION ERROR:",
        error
      );

      return "Sorry, I couldn't connect to the AI assistant right now. Please try again.";
    }

    if (!data) {
      return "Sorry, I didn't receive a response from the AI assistant.";
    }

    if (data.error) {
      console.log(
        "MEDIPAL GEMINI ERROR:",
        data.error
      );

      return "Sorry, the AI assistant could not process your question right now.";
    }

    if (data.reply) {
      return data.reply;
    }

    return "Sorry, I couldn't generate a response. Please try again.";

  } catch (error) {
    console.log(
      "CHATBOT SERVICE ERROR:",
      error
    );

    return "Sorry, something went wrong while connecting to MediPal AI.";
  }
}