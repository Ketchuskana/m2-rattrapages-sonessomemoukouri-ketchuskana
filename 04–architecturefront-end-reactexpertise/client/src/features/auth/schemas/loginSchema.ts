import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Adresse email invalide"),

  password: z
    .string()
    .min(1, "Veuillez saisir votre mot de passe"),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;
