import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const bmi = calculateBmi(height, weight);
  if (!height || !weight || height < 0 || weight < 0) {
    res.status(400).send({ error: "malformatted parameters" });
  } 
  res.send({ weight, height, bmi });
  
});

app.get('/exercises', (req, res) => {
  
  const strToNumArray = (str: string): Array<number> => {
    return str
    .substring(1, str.length-1)
    .split(',')
    .map(each => Number(each));
  };
  
  const targetValue = Number(req.query.target);
  const trainingArray = strToNumArray(req.query.daily_exercises);

  if (!trainingArray || !targetValue) {
    res.status(400).send({ error: "parameters missing" });
  }
  
  const { days, trainingDays, avgTime, targetMet,rating, ratingDescription} = calculateExercises(targetValue, trainingArray);
  
  res.status(200).send({
    days,
    trainingDays,
    targetValue,
    avgTime,
    targetMet,
    rating,
    ratingDescription
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});