const express = require("express");
const mongooose = require("mongoose");
const cors = require("cors")
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();
const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongooose
    .connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
app.use(cors())
app.use(express.json());
app.enable("trust proxy")

// Router
const postRouter = require("./routes/postRoutes");

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World 1234 </h1>");
  console.log("Hi!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
