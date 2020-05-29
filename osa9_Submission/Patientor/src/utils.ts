/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, Patient, Entry, HealthCheckRating } from './types';

const isString = (param: any): param is string => {
  return typeof(param) === 'string' || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return (Object.values(Gender).includes(param));
};

const isRating = (param: any): param is HealthCheckRating => {
  return (Object.values(HealthCheckRating).includes(param));
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Missing or incorrect id: ' + id);
  }
  return id;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Missing or incorrect name: ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Missing or incorrect date: ' + date);
  }
  return date;
};

const parseSSN = (soc: any): string => {
  if (!soc || !isString(soc)) {
    throw new Error('Missing or incorrect SSN: ' + soc);
  }
  return soc;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Missing or incorrect gender: ' + gender);
  }
  return gender;
};

const parseJob = (job: any): string => {
  if (!job || !isString(job)) {
    throw new Error('Missing or incorrect occupation: ' + job);
  }
  return job;
};

// const parseEntries = (entryList: any): Entry[] => {
//   if(!entryList || !undefined) {
//     throw new Error('Missing or incorrect entries:' + entryList);
//   }
//   return entryList;
// };

const parseDescription = (description: any): string => {
  if(!description || !isString(description)) {
    throw new Error('Missing or incorrect entry description:' + description);
  }
  return description;
};

const parseSpecialist = (doctor: any): string => {
  if(!doctor|| !isString(doctor)) {
    throw new Error('Missing or incorrect entry specialist:' + doctor);
  }
  return doctor;
};

const parseCodes = (codes: any[]): string[] => {
  if(!(codes.length > 0) && !(codes.every(c => isString(c)) )) {
    throw new Error('Incorrect codes: ' + codes);
  }
    return codes;
  };

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if(!discharge || !isDate(discharge.date) || !isString(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Missing or incorrect properties for discharge object: '+ discharge.date + ' ' + discharge.criteria);
  }
  return discharge;
};

const parseRating = (rating: any): HealthCheckRating => {
  if((!rating && rating !== 0) || !isRating(rating)) {
    throw new Error('Missing or incorrect rating: '+ rating + isRating(rating) + !rating);
  }
  return rating;
};

const parseSickLeave = (leave: any): { startDate: string; endDate: string } => {
  if(!leave || !isDate(leave.startDate) || !isString(leave.startDate) || !isDate(leave.endDate) || !isString(leave.endDate)) {
    throw new Error('Missing or incorrect properties for sick leave object: '+ leave.startDate + ' ' + leave.endDate);
  }
  return leave;
};

export const toNewPatient = (object: any): Patient => {
  return {
    id: parseId(object.id),
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseJob(object.occupation),
  };
};

export const toNewEntry = (object: any): Entry => {
  const newEntry = {
    type: object.type,
    id: parseId(object.id),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes ? parseCodes(object.diagnosisCodes) : undefined
  };

  switch(object.type) {
    case "Hospital": 
      const hospitalEntry = { ...newEntry, discharge: parseDischarge(object.discharge)};
      return hospitalEntry;
    case "HealthCheck":
      const healthCheckEntry = { ...newEntry,
      healthCheckRating: parseRating(object.healthCheckRating)};
      return healthCheckEntry;
    case "OccupationalHealthcare": 
      const occupationalHCEntry = { ...newEntry, employerName: parseName(object.employerName), sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined };
      return occupationalHCEntry;
    default:
      throw new Error('Incorrect Entry type');
    }
  };