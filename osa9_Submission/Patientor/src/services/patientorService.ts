import { Diagnosis, Patient, NonSensitivePatient, Entry } from '../types';
import diagnosticData from '../../data/diagnoses.json';
import patientData from '../../data/patients';
import { toNewPatient, toNewEntry } from '../utils';

const diagnoses: Diagnosis[] = diagnosticData;
const patients: Patient[] = patientData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatient => ({
    id, name, dateOfBirth, gender, occupation }));
};

const addNewPatient = (newPatient: Omit<Patient, "id">): Patient[] => {
  const newPatWithId = { ...newPatient, id: String(patients.length + 1)};
  patients.push(toNewPatient(newPatWithId));
  return patients;
};

const addPatientEntry = (id: string, entry: Entry): Entry[] | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    if (!patient.entries) {
      patient.entries = [];
    } 
    if (!entry.id) {
      entry.id = String(patient.entries.length + 1);
    }
    patient.entries.push(toNewEntry(entry));
    return patient.entries;
  }
  return undefined;
};

export default {
  getDiagnoses,
  getPatient,
  getPatients,
  getNonSensitivePatients,
  addNewPatient,
  addPatientEntry
};