import { z } from "zod";

// standard IPv4 Regex for manual validation
const ipRegex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;

export const TelemetrySchema = z.object({
  id: z.string().uuid(),
  severity: z.number().min(1).max(10),
  origin: z.string().regex(ipRegex, "Invalid IPv4 address").optional(),
  entropy: z.number().optional(), 
  timestamp: z.number().default(() => Date.now()),
});

export type TelemetryType = z.infer<typeof TelemetrySchema>;