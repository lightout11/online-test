import OpenAI from "openai";

const openai = new OpenAI();

export async function examineOpenedAnswer(question: any, answer: string) {
  const command = `So sánh câu trả lời của câu hỏi sau: ${question.content}.`;
  const correctAnswer = `Câu trả lời đúng: ${question.answer}.`;
  const userAnswer = `Câu trả lời được thi sinh trả lời: ${answer}.`;
  const caution =
    "Lưu ý: Chỉ trả lời bằng một từ: đúng hoặc sai, không cần phân tích.";
  const prompt = `${command}\n${correctAnswer}\n${userAnswer}\n${caution}\n`;

  const result = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
  });

  if (result.choices[0].message.content?.includes("đúng")) {
    return true;
  } else {
    return false
  }
}
