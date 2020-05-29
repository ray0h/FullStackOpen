import express from 'express';
import patientService from '../services/patientorService';

const router =  express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getDiagnoses());
});

export default router;