import patientData from "../../data/patients";
import {
  NewPatient,
  Patient,
  NonSensitivePatient,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const getPatientsData = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), ...patient };
  patientData.push(newPatient);
  return newPatient;
};

const addNewEntry = (patientID: Patient["id"], newEntry: EntryWithoutId) => {
  const patient = patientData.find((p) => p.id === patientID);
  if (!patient) return undefined;
  const entryGenereted = { id: uuid(), ...newEntry };
  patientData.map((p) =>
    p.id === patientID ? p.entries.push(entryGenereted) : p
  );
  return entryGenereted;
};

const getPatientInfo = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

export default {
  getPatientsData,
  getNonSensitivePatients,
  addNewPatient,
  getPatientInfo,
  addNewEntry,
};
