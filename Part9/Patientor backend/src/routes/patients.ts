import express from "express";
import patientService from "../services/patientService";
import { getNewPatient } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  //res.send(patientService.getPatientsData());
  res.send(patientService.getPatientsWithoutSsn());
});

router.post("/", (req, res) => {
  try {
    const newPatient = getNewPatient(req.body);
    const patientAdded = patientService.addNewPatient(newPatient);
    res.json(patientAdded);
  } catch (error: unknown) {
    let msj = "Something went wrong.";
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else if (error instanceof Error) {
      msj += ".." + error.message;
    }
    res.status(400).send(msj);
  }
});

export default router;
