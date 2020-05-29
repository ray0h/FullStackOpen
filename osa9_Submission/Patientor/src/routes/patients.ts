import express from 'express';
import patientService from '../services/patientorService';

const router =  express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  (patient) ? res.send(patient) : res.sendStatus(404);
});

router.get('/:id/entries', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  (!patient) ? res.sendStatus(404) : patient.entries ? res.send(patient.entries) : res.send(patient);
});

router.post('/', (req, res) => {
  try{
    const newPatientList = patientService.addNewPatient(req.body);
    res.json(newPatientList);
  } catch (error) {
    res.status(400).send('error: ' + error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntryList = patientService.addPatientEntry(req.params.id, req.body);
    res.json(newEntryList);
  } catch(error){
    res.status(400).send('error: ' + error.message);
  }
});

export default router;