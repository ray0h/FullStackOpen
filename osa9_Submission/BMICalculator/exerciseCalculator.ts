interface ExVariables {
  targetValue: number;
  trainingArray: Array<number>;
}

interface Result {
  days: number;
  trainingDays: number;
  targetValue: number;
  avgTime: number;
  targetMet: boolean;
  rating: number;
  ratingDescription: string;
}

const parseExVariables = (args: Array<string>): ExVariables => {
  if (args.length < 4) {
    throw new Error ("Not enough variables to calculate!");
  }
  const targetValue = Number(args[2]);
  const trainingArray = args.slice(3,).map(each => Number(each));
  return {
    targetValue,
    trainingArray
  };
};

export const calculateExercises = (targetValue: number, trainingArray: Array<number>): Result => {
  const days = trainingArray.length;
  const trainingDays = trainingArray.filter(d => d !== 0).length;
  const avgTime = trainingArray.reduce((a,b) => a+b) / days;
  const targetMet = avgTime > targetValue;
  const ratio = avgTime / targetValue;
  const rating = (ratio < 0.75) 
  ? 1 
    : (ratio >= 0.75 && ratio <= 1.25) 
      ? 2
      : 3;
  const ratingDescription = (rating: number): string => {switch(rating) {
    case 1: return "please try harder";
    case 2: return "doing great, but room for improvement";
    case 3: return "crushed it";
    default: return "error, something went wrong";
  }};

  return {
    days, 
    trainingDays,
    targetValue,
    avgTime, 
    targetMet,
    rating,
    ratingDescription: ratingDescription(rating)
  };
};

try {
  const { targetValue, trainingArray } = parseExVariables(process.argv);
  console.log(calculateExercises(targetValue, trainingArray));
} catch (error) {
  console.log('Error occurred:', error.message);
}
