import { Router } from "express";
import {
  getDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog
} from "../controllers/dog.controller";

const router = Router();

router.get("/", getDogs);
router.get("/:id", getDogById);
router.post("/", createDog);
router.put("/:id", updateDog);
router.delete("/:id", deleteDog);

export default router;
