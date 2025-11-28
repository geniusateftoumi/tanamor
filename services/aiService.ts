import { GoogleGenAI, Type } from "@google/genai";
import { QuizScenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Themes for the 25-question game
export const GAME_THEMES = [
  "التعامل مع المدير المتسلط",
  "الرد على الشائعات",
  "تجاهل الاستفزاز اللفظي",
  "الإبلاغ عن مخالفة أخلاقية",
  "إدارة الغضب أثناء الاجتماع"
];

const SYSTEM_INSTRUCTION = `أنت محرك لعبة محاكاة وظيفية. 
دورك هو توليد سيناريوهات واقعية وموجزة جداً في بيئة العمل.
يجب أن توفر 4 خيارات للرد (أ، ب، ج، د).
يجب أن تكون الدرجات من 0 إلى 10.
اللغة: العربية فقط.
الرد يجب أن يكون JSON صالح ومتكامل.`;

export const generateGameScenario = async (
  questionIndex: number,
  theme: string,
  previousScenarios: string[] = []
): Promise<QuizScenario> => {
  try {
    // Construct exclusion context to prevent repetition
    const previousContext = previousScenarios.length > 0 
      ? `هام جداً: يجب أن يكون السيناريو جديداً ومختلفاً كلياً عن السيناريوهات السابقة التالية: ${JSON.stringify(previousScenarios)}`
      : "";

    // Highly optimized prompt for structure and brevity
    const prompt = `
    المهمة: إنشاء سيناريو لعبة تعليمية (سؤال وجواب) عن موضوع: "${theme}".
    رقم السؤال: ${questionIndex + 1} من 25.
    
    ${previousContext}

    المطلوب JSON يحتوي على:
    1. theme: نص الموضوع.
    2. scenario_text: وصف الموقف (حد أقصى 40 كلمة).
    3. options: قائمة من 4 خيارات بالضبط.
       لكل خيار:
       - id: "A", "B", "C", "D"
       - text: نص التصرف (حد أقصى 15 كلمة).
       - score: درجة (0, 3, 7, أو 10).
       - feedback: نتيجة التصرف (حد أقصى 15 كلمة).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5, // Slightly increased for more variety while maintaining structure
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            scenario_text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  feedback: { type: Type.STRING }
                },
                required: ["id", "text", "score", "feedback"]
              }
            }
          },
          required: ["theme", "scenario_text", "options"]
        }
      },
      contents: prompt,
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned");
    
    let parsed: QuizScenario;
    try {
        parsed = JSON.parse(jsonText) as QuizScenario;
    } catch (e) {
        console.error("JSON Parse Error. Raw text:", jsonText);
        throw new Error("Failed to parse AI response as JSON");
    }

    // Validate structure to prevent "cannot read properties of undefined" in UI
    if (!parsed.options || !Array.isArray(parsed.options) || parsed.options.length === 0) {
      throw new Error("Invalid AI response structure: options missing");
    }
    
    return parsed;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback static scenario in case of API failure to prevent app crash
    return {
      theme: theme,
      scenario_text: "حدث خطأ في الاتصال بالذكاء الاصطناعي أو انتهت مهلة الاستجابة. يرجى المحاولة مرة أخرى.",
      options: [
        { id: "A", text: "حاول مرة أخرى", score: 0, feedback: "خطأ تقني" },
        { id: "B", text: "تجاهل", score: 0, feedback: "خطأ تقني" },
        { id: "C", text: "إبلاغ الدعم", score: 0, feedback: "خطأ تقني" },
        { id: "D", text: "خروج", score: 0, feedback: "خطأ تقني" }
      ]
    };
  }
};