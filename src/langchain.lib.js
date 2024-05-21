import { config } from "dotenv";
config();

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

const embeddings = new OpenAIEmbeddings();
const vectorStore = await FaissStore.load("./", embeddings);

export async function initQuestionWithScore(query) {
  const res = await vectorStore?.similaritySearchWithScore(query);
  // score luôn nhỏ hơn 1 vì tính toán  cosine_similarity(A, B) = (A . B) / (||A|| * ||B||)
  // cosine_distance(A, B) = 1 - cosine_similarity(A, B)
  console.log("res", res);
  if (!res || !res[0]) return "-1 Không tìm thấy trong bộ câu hỏi";
  return res;
}
