const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "overweight";
  } else if (bmi >= 30) {
    return "obese";
  }
};

console.log(calculateBmi(180, 74));
