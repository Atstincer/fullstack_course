import express from "express";
import { calculateStringQueryBMI } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  const height = typeof req.query.height === "string" ? req.query.height : "";
  const weight = typeof req.query.weight === "string" ? req.query.weight : "";
  try {
    const bmiResult = calculateStringQueryBMI(height, weight);
    res.send({
      weight: 72,
      height: 180,
      bmi: bmiResult,
    });
  } catch (error: unknown) {
    let errorMsg: string = "Something went wrong...";
    if (error instanceof Error) {
      errorMsg += "Error: " + error.message;
    }
    res.send({ error: errorMsg });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
