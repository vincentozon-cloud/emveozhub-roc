import { TelemetryType } from "./schema";
import { v4 as uuidv4 } from "uuid";


export const generateSlowDripAttack = (count: number = 10): TelemetryType[] => {
  const attackSource = "192.168.1.50";
  const now = Date.now();
  
  return Array.from({ length: count }).map((_, i) => ({
    id: uuidv4(),
    severity: 3, 
    origin: attackSource,
    entropy: Math.random() * 0.5,
    // Spaced out by 5 minutes each to stay "under the radar"
    timestamp: now - (i * 5 * 60 * 1000), 
  }));
};


export const generateBackgroundNoise = (count: number = 5): TelemetryType[] => {
  return Array.from({ length: count }).map(() => ({
    id: uuidv4(),
    severity: Math.floor(Math.random() * 2) + 1, // Very low (1-2)
    origin: `10.0.0.${Math.floor(Math.random() * 255)}`,
    entropy: Math.random(),
    timestamp: Date.now() - (Math.random() * 3600000), // Randomly in the last hour
  }));
};