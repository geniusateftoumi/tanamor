import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for Workplace Bullying Education Persona
const SYSTEM_INSTRUCTION = `أنت مدرب ذكي متخصص في "بيئة العمل الآمنة" ومكافحة التنمر الوظيفي.
هدفك هو تدريب المستخدم من خلال "لعبة محاكاة" (Roleplay) على كيفية التعامل مع المواقف الصعبة في العمل.

قواعد اللعبة:
1. إذا طلب المستخدم "محاكاة"، قم بتقمص شخصية زميل متنمر أو مدير سام (Toxic Manager) أو موقف محرج، واطلب من المستخدم الرد.
2. بعد رد المستخدم، قم بتحليل رده: هل كان حازماً؟ هل كان مهنياً؟ هل حافظ على حقوقه؟
3. قدم نصائح مبنية على الذكاء العاطفي وقوانين العمل العامة (بشكل عام).
4. كن داعماً ولكن واقعياً. التنمر الوظيفي يتطلب حكمة وليس مجرد انفعال.
5. تحدث باللغة العربية بأسلوب مهني وواضح.

أنواع المحاكاة التي يمكنك القيام بها:
- المدير الذي يسرق مجهود الموظف.
- الزميل الذي يطلق شائعات (Gossip).
- التنمر اللفظي أو الاستبعاد الاجتماعي.
- الانتقاد غير البناء أمام الجميع.

ابدأ دائماً بتشجيع المستخدم على فهم الموقف قبل الرد.`;

export const sendMessageToGemini = async (
  history: Message[], 
  newMessage: string
): Promise<string> => {
  try {
    // Filter out system messages as Gemini API typically expects user/model turns
    const validHistory = history.filter(msg => msg.role === 'user' || msg.role === 'model');

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: validHistory.map(h => ({
        role: h.role as 'user' | 'model',
        parts: [{ text: h.content }],
      })),
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "عذرًا، لم أتمكن من معالجة الموقف حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "لا أستطيع الاتصال بالخادم حاليًا. يرجى المحاولة مرة أخرى.";
  }
};