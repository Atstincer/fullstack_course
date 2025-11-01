import patientData from "../../data/patients";
import { NewPatient, Patient, PatientWithoutSsn } from "../types";
import { v1 as uuid } from "uuid";

const getPatientsData = (): Patient[] => {
  return patientData;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
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

export default { getPatientsData, getPatientsWithoutSsn, addNewPatient };
