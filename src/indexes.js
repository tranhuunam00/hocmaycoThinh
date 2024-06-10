import { config } from "dotenv";
config();

import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

const loader = new TextLoader("./dataCuoiKi/QuesUET.txt");

const docs = await loader.load();

const splitter = new CharacterTextSplitter({
  chunkSize: 6,
  chunkOverlap: 0,
  separator: "\n",
});


const documents = await splitter.splitDocuments(docs);
console.log(documents);

console.log(process.env.OPENAI_API_KEY);

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY
});

const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
await vectorstore.save("./");
