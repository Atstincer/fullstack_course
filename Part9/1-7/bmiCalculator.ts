interface CalculatorValues {
  height: number;
  weight: number;
}

const getValidCMDArgs = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error("No enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  return getValues(args[2], args[3]);
};

const getValidStringQueryArgs = (
  height: string,
  weight: string
): CalculatorValues => {
  if (!height || !weight) throw new Error("No the right arrguments");
  return getValues(height, weight);
};

const getValues = (value1: string, value2: string): CalculatorValues => {
  if (isNaN(Number(value1)) || isNaN(Number(value2))) {
    throw new Error("Arguments are no valid");
  }

  return {
    height: Number(value1),
    weight: Number(value2),
  };
};

const calculateBmi = ({ height, weight }: CalculatorValues): string => {
  console.log("height", height);
  console.log("weight", weight);

  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "overweight";
  } else {
    //bmi >= 30
    return "obese";
  }
};

const calculateCMDBMI = (): string => {
  try {
    const args = getValidCMDArgs(process.argv);
    return calculateBmi(args);
  } catch (error: unknown) {
    let msg: string = "Something went wrong...";
    if (error instanceof Error) {
      msg += "Error: " + error.message;
    }
    return msg;
  }
};

export const calculateStringQueryBMI = (
  height: string,
  weight: string
): string => {
  const args = getValidStringQueryArgs(height, weight);
  return calculateBmi(args);
};

if (require.main === module) {
  console.log(calculateCMDBMI());
}
