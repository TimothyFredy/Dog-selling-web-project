import { Request, Response, NextFunction } from "express";
import * as DogModel from "../models/dog.model";
import { createDogSchema, updateDogSchema } from "../schemas/dog.schema";

export async function getDogs(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dogs = await DogModel.findAll();

    res.json({
      success: true,
      data: dogs
    });
  } catch (error) {
    next(error);
  }
}

export async function getDogById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid dog ID"
      });
    }

    const dog = await DogModel.findById(id);

    if (!dog) {
      return res.status(404).json({
        success: false,
        message: "Dog not found"
      });
    }

    res.json({
      success: true,
      data: dog
    });
  } catch (error) {
    next(error);
  }
}

export async function createDog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = createDogSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues
      });
    }

    const id = await DogModel.create(validation.data);
    const dog = await DogModel.findById(id);

    res.status(201).json({
      success: true,
      message: "Dog created successfully",
      data: dog
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid dog ID"
      });
    }

    const validation = updateDogSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.issues
      });
    }

    const existingDog = await DogModel.findById(id);

    if (!existingDog) {
      return res.status(404).json({
        success: false,
        message: "Dog not found"
      });
    }

    await DogModel.update(id, validation.data);

    const dog = await DogModel.findById(id);

    res.json({
      success: true,
      message: "Dog updated successfully",
      data: dog
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid dog ID"
      });
    }

    const deleted = await DogModel.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Dog not found"
      });
    }

    res.json({
      success: true,
      message: "Dog deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}
