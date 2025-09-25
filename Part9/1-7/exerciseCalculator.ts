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

const calculateExercises = (
  training: number[],
  target: number
): TrainingEval => {
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
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
