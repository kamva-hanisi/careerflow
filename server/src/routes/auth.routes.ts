import { Router } from "express";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid registration data",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  return res.status(201).json({
    message: "Register route ready",
    user: {
      name: parsed.data.name,
      email: parsed.data.email
    }
  });
});

authRouter.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid login data",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  return res.json({
    message: "Login route ready",
    email: parsed.data.email
  });
});
