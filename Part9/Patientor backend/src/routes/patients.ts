import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { z } from "zod";
import { NewPatient, NewPatientSchema } from "../types";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
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
  (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
    const patientAdded = patientService.addNewPatient(req.body);
    res.json(patientAdded);
  }
);

router.use(errorMiddleware);

export default router;
