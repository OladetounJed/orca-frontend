import { z } from "zod";
 
export const registerFormSchema = z.object({
  telegramId: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  firstName: z.string().min(1).max(50),
});
 
export type RegisterFormSchema = typeof registerFormSchema;