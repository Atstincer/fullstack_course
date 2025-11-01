import { NewPatient, Gender } from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const parseName = (arg: unknown): string => {
  if (!arg || !isString(arg)) {
    throw new Error("Malformated or missing name");
  }
  return arg;
};

const isDate = (str: string): boolean => {
  return Boolean(Date.parse(str));
};

const parseDate = (arg: unknown): string => {
  if (!arg || !isString(arg) || !isDate(arg)) {
    throw new Error("Malformated or missing date of birth");
  }
  return arg;
};

const parseSsn = (arg: unknown): string => {
  if (!arg || !isString(arg)) {
    throw new Error("Malformated or missing ssn");
  }
  return arg;
};

const isGender = (arg: string): arg is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(arg);
};

const parseGender = (arg: unknown): Gender => {
  if (!arg || !isString(arg) || !isGender(arg)) {
    throw new Error("Malformated or missing gender");
  }
  return arg;
};

const parseOccupation = (arg: unknown): string => {
  if (!arg || !isString(arg)) {
    throw new Error("Malformated or missing occupation");
  }
  return arg;
};

export const getNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("New patient missing or wrong parameters.");
  }
  if (
    "name" in obj &&
    "dateOfBirth" in obj &&
    "ssn" in obj &&
    "gender" in obj &&
    "occupation" in obj
  ) {
    return {
      name: parseName(obj.name),
      dateOfBirth: parseDate(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
    };
  }
  throw new Error("Missing property");
};
