const express = require("express");
const server = express();
const cors = require("cors");
const dotenv = require("dotenv");

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(express.json());
dotenv.config();

const port = process.env.PORT;
const dbConnection = require("./dbConfig");

const userRoute = require("./router/userRouter");
const questionRoute = require("./router/questionRoute");
const answerRoute = require("./router/answerRoute");

server.use("/api/users", userRoute);
server.use("/api/questions", questionRoute);
server.use("/api/answers", answerRoute);

const start = async () => {
  try {
    await dbConnection.execute("select 'test'");
    server.listen(port);
    console.log(`server listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
};
start();

server.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});
