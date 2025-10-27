import express from "express";
import cors from "cors";
import diagnosesRoute from "./routes/diagnoses";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("some ping");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRoute);

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`);
});
