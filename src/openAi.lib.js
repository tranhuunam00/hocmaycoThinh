import OpenAI from "openai";
import { config } from "dotenv";
config();
const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;
export async function getQAScoreOpenAI(data, input) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Hãy dựa vào bộ câu hỏi, câu trả lời sau: ${data} có trọng số . Hãy trả lời cho tôi câu ${input} bằng tiếng Việt yêu tiên sử dụng nội dung tôi đã cung cấp về đại học Công nghệ - VNU. Yêu cầu không vi phạm pháp luật, không có tính bạo lực, sex"`,
          // content: `Như 1 người kiểm duyệt tôi muốn biết người dùng đã hỏi câu hỏi nào trong những câu hỏi sau ${input}. và câu nào đứng trước là câu có tỉ lệ đúng cao hơn . Bắt buộc chỉ tra kết quả về là 1 số tự nhiên được tính bằng 2 kí tự đầu của câu hỏi không tự tiện bổ sung thêm. Nếu cảm thấy không phải thuộc một trong các câu hỏi trên thì trả về  -1. Ví dụ nếu câu 8. hết lịch học thì đi ngủ đúng thì chỉ trả về 8, nếu câu 9. sau khi đi chơi thì làm gì đúng thì trả về 9`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return completion?.choices[0]?.message?.content;
  } catch (error) {
    console.log(error);
  }
}

export async function chatWithOpenAI(input) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return completion?.choices[0]?.message?.content;
  } catch (error) {
    console.log(error);
  }
}
