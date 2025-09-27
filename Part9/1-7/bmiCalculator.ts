interface CalculatorValues {
  height: number;
  weight: number;
}

const getValidArgs = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error("No enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Arguments are no valid");
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

const calculateBmi = () => {
  try {
    const { height, weight } = getValidArgs(process.argv);
    console.log("height", height);
    console.log("weight", weight);

    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    if (bmi < 18.5) {
      console.log("underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      console.log("normal weight");
    } else if (bmi >= 25 && bmi <= 29.9) {
      console.log("overweight");
    } else if (bmi >= 30) {
      console.log("obese");
    }
  } catch (error: unknown) {
    let msg: string = "Something went wrong...";
    if (error instanceof Error) {
      msg += "Error: " + error.message;
    }
    console.log(msg);
  }
};

calculateBmi();
