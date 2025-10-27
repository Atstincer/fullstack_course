import patientData from "../../data/patients";
import { Patient, PatientWithoutSsn } from "../types";

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

export default { getPatientsData, getPatientsWithoutSsn };
