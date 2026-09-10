import { z } from "zod";

export const createDogSchema = z.object({
  name: z.string().min(2).max(150),
  imageUrl: z.string().max(500).optional(),
  details: z.string().max(2000).optional(),
  price: z.number().nonnegative(),
  currencyCode: z.string().length(3).default("TZS")
});

export const updateDogSchema = z.object({
  name: z.string().min(2).max(150).optional(),
  imageUrl: z.string().max(500).optional(),
  details: z.string().max(2000).optional(),
  price: z.number().nonnegative().optional(),
  currencyCode: z.string().length(3).optional(),
  isActive: z.boolean().optional()
});
