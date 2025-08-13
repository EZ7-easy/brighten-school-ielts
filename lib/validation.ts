import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3),
  tel: z.string().min(9).max(13),
  school: z.string(),
});
// this is good
