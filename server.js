const express = require("express");
const questionRout = require("./src/questions/routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4201;
app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/v1/question", questionRout);

app.listen(port, () => console.log(`app is running on ${port}`));
