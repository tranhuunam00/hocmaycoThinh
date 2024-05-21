import express from "express";
const app = express();
import { config } from "dotenv";
import { initQuestionWithScore } from "./src/langchain.lib.js";
import TelegramBot from "node-telegram-bot-api";
import { getQAScoreOpenAI } from "./src/openAi.lib.js";
import { UETQA } from "./src/constant.js";

const bot = new TelegramBot(process.env.TOKEN_BOT_TELE, { polling: true });

config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const getIndexQ = (text = "") => {
  console.log(text.substring(0, 2));
  return +text.substring(0, 2) || +text.substring(0, 1);
};

bot.on("message", async (msg) => {
  const data = await initQuestionWithScore(msg.text);
  let returnText = "";

  if (+data[0][1] < 0.1) {
    returnText = UETQA[getIndexQ(data[0][0].pageContent)];
  } else {
    if (+data[0][1] < 0.2 && +data[0][1] - +data[1][1] > 0.5) {
      returnText = UETQA[getIndexQ(data[0][0].pageContent)];
    } else {
      returnText = await getQAScoreOpenAI(
        JSON.stringify(
          data.map((d) => {
            console.log("-------", +(1 - +d[1]) * 100);
            console.log(d[1]);
            return {
              "câu hỏi": d[0].pageContent,
              "câu trả lời": UETQA[getIndexQ(d[0].pageContent)],
              "trọng số": +(1 - +d[1]) * 100,
            };
          })
        ),
        msg.text
      );
    }
  }
  bot.sendMessage(msg.chat.id, returnText);
});

app.listen(3000, () => {
  console.log(`Chat bot run on port: ${3000}`);
});

// // telebot
