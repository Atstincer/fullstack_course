type Rating = 1 | 2 | 3;

interface TrainingEval {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseValues {
  target: number;
  daily_exercises: number[];
}

const getValidValuesCMD = (args: string[]): ExerciseValues => {
  if (args.length <= 3) throw new Error("No enough argumentgs");
  if (isNaN(Number(args[2]))) throw new Error("No valid arguments");
  const daily_exercises: number[] = [];
  for (let x = 3; x < args.length; x++) {
    if (isNaN(Number(args[x]))) throw new Error("No valid arguments");
    daily_exercises.push(Number(args[x]));
  }
  return {
    target: Number(args[2]),
    daily_exercises,
  };
};

const calculateExercises = ({
  target,
  daily_exercises,
}: ExerciseValues): TrainingEval => {
  const trainingDays = daily_exercises.reduce((sum, v) => {
    return v > 0 ? sum + 1 : sum;
  }, 0);

  const totalHoursTraining = daily_exercises.reduce((sum, v) => {
    return sum + v;
  }, 0);

  const average = totalHoursTraining / daily_exercises.length;

  const rating = average >= target ? 3 : average > target / 2 ? 2 : 1;

  return {
    periodLength: daily_exercises.length,
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
};

const getErrorMessage = (error: unknown): string => {
  let msg = "Somthing went wrong";
  if (error instanceof Error) {
    msg += "...Error: " + error.message;
  }
  return msg;
};

const calculateExercisesFromCMD = (): TrainingEval | undefined => {
  try {
    const values = getValidValuesCMD(process.argv);
    return calculateExercises(values);
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
    return undefined;
  }
};

export const calculateExercisesFromEndPoint = (
  target: number,
  daily_exercises: number[]
): TrainingEval => {
  return calculateExercises({ target, daily_exercises });
};

if (require.main === module) {
  console.log(calculateExercisesFromCMD());
}
