import { z } from "zod";

export const bookingSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  email: z
    .string()
    .email("Adresse email invalide"),

  phone: z
    .string()
    .min(8, "Numéro de téléphone invalide"),

  date: z
    .string()
    .min(1, "Veuillez choisir une date"),

  time: z
    .string()
    .min(1, "Veuillez choisir une heure"),

  serviceId: z
    .number()
    .min(1, "Veuillez choisir une prestation"),
});

export type BookingFormData =
  z.infer<typeof bookingSchema>;