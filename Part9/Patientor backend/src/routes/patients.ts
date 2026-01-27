import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import {
  EntryWithoutId,
  NewBaseEntrySchema,
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewPatient,
  NewPatientSchema,
  Patient,
} from "../types";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  //console.log("getting some error in error middleware", error);
  if (error instanceof z.ZodError) {
    console.log("zod error issues", error.issues);
    res.status(400).send({ error: error.issues });
  } else {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const base = NewBaseEntrySchema.parse(req.body);
    switch (base.type) {
      case "HealthCheck":
        NewHealthCheckEntrySchema.parse(req.body);
        break;
      case "Hospital":
        NewHospitalEntrySchema.parse(req.body);
        break;
      case "OccupationalHealthcare":
        NewOccupationalHealthcareEntrySchema.parse(req.body);
        break;
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res) => {
  //res.send(patientService.getPatientsData());
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  //console.log(`trying to get some patient ${req.params.id} info`);
  const patient = patientService.getPatientInfo(req.params.id);
  if (patient) res.json(patient);
  else res.status(404).send({ error: "Patient not found" });
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const patientAdded = patientService.addNewPatient(req.body);
    res.json(patientAdded);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res) => {
    const patientId = req.params.id;
    const newEntry = patientService.addNewEntry(
      patientId ? patientId : "",
      req.body,
    );
    if (newEntry) res.json(newEntry);
    else res.status(400).send({ error: "Bad request....client not found" });
  },
);

router.use(errorMiddleware);

export default router;
