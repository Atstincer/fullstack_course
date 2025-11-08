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
  res.send(patientService.getPatientsWithoutSsn());
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
