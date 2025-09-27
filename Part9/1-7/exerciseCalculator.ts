type Rating = 1 | 2 | 3;

interface TrainingEval {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: String;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  training: number[];
}

const getValidValues = (args: string[]): ExerciseValues => {
  if (args.length <= 3) throw new Error("No enough argumentgs");
  if (isNaN(Number(args[2]))) throw new Error("No valid arguments");
  let training: number[] = [];
  for (let x = 3; x < args.length; x++) {
    if (isNaN(Number(args[x]))) throw new Error("No valid arguments");
    training.push(Number(args[x]));
  }
  return {
    target: Number(args[2]),
    training,
  };
};

const calculateExercises = (): TrainingEval => {
  try {
    const { target, training } = getValidValues(process.argv);

    const trainingDays = training.reduce((sum, v) => {
      return v > 0 ? sum + 1 : sum;
    }, 0);

    const totalHoursTraining = training.reduce((sum, v) => {
      return sum + v;
    }, 0);

    const average = totalHoursTraining / training.length;

    const rating = average >= target ? 3 : average > target / 2 ? 2 : 1;

    return {
      periodLength: training.length,
      trainingDays,
      success: average >= target,
      rating,
      ratingDescription:
        rating === 3
          ? "very goog"
          : rating === 2
          ? "it could be better"
          : "you need to focus more",
      target,
      average,
    };
  } catch (error: unknown) {
    let msg = "Somthing went wrong";
    if (error instanceof Error) {
      msg += "...Error: " + error.message;
    }
    console.log(msg);
  }
};

console.log(calculateExercises());
