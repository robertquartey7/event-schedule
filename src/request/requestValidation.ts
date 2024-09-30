import { z } from "zod";

export const loginRequestValidate = z.object({
  username: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 letters"),
});
