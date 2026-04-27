import { Router } from "express";
import { z } from "zod";
const statusEnum = z.enum(["Applied", "Interview", "Offer", "Rejected"]);
const createApplicationSchema = z.object({
    company: z.string().min(2),
    role: z.string().min(2),
    status: statusEnum,
    notes: z.string().max(500).optional(),
    deadlineDate: z.string().optional(),
    interviewDate: z.string().optional(),
    cvVersion: z.string().optional(),
    jobUrl: z.string().url().optional()
});
export const applicationsRouter = Router();
applicationsRouter.get("/", (req, res) => {
    const status = statusEnum.optional().safeParse(req.query.status);
    const search = typeof req.query.search === "string" ? req.query.search : "";
    res.json({
        filters: {
            status: status.success ? status.data : undefined,
            search
        },
        data: [
            {
                id: 1,
                company: "OpenAI",
                role: "Junior Developer",
                status: "Interview",
                deadlineDate: "2026-04-28"
            }
        ]
    });
});
applicationsRouter.post("/", (req, res) => {
    const parsed = createApplicationSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid application data",
            errors: parsed.error.flatten().fieldErrors
        });
    }
    return res.status(201).json({
        message: "Application route ready",
        application: parsed.data
    });
});
