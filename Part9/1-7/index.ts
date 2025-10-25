import express from "express";
import { calculateStringQueryBMI } from "./bmiCalculator";
import { calculateExercisesFromEndPoint } from "./exerciseCalculator";

const app = express();

app.use(express.json());

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
      weight,
      height,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasNoNumberElemnt = (elementArray: any[]): boolean => {
  let result: boolean = false;
  elementArray.forEach((e) => {
    if (!result && typeof e !== "number") result = true;
  });
  return result;
};

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  console.log("typeof target", typeof target);
  console.log("typeof daily_exercises", typeof daily_exercises);

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (
    typeof target !== "number" ||
    !Array.isArray(daily_exercises) ||
    hasNoNumberElemnt(daily_exercises)
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercisesFromEndPoint(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
