export interface TelemetrySignal {
  id: string;
  severity: number; // 1-10 (e.g., Port Scan=2, Failed Login=5, Unauthorized API=9)
  timestamp: number;
}

/**
 * THE BRAIN: Calculates accumulated risk using a Time-Decay Heuristic.
 * Solving the "Slow-Drip" Exfiltration Problem.
 */
export function calculateNeuralRisk(signals: TelemetrySignal[]): number {
  const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
  const now = Date.now();

  return signals.reduce((totalRisk, signal) => {
    const age = now - signal.timestamp;

    // Ignore signals older than 6 hours
    if (age > SIX_HOURS_MS || age < 0) return totalRisk;

    /**
     * TIME-DECAY CALCULATION:
     * Newer signals have a weight of ~1.0. 
     * Signals at the 6-hour mark have a weight of ~0.
     * This ensures the ROC "forgets" old noise but spikes on "Clusters."
     */
    const recencyWeight = 1 - (age / SIX_HOURS_MS);
    
    return totalRisk + (signal.severity * recencyWeight);
  }, 0);
}

export const getRiskLevel = (score: number) => {
  if (score > 15) return { label: "CRITICAL", color: "text-red-500", glow: "shadow-red-500/50" };
  if (score > 8) return { label: "WARNING", color: "text-amber-500", glow: "shadow-amber-500/50" };
  return { label: "NOMINAL", color: "text-emerald-500", glow: "shadow-emerald-500/50" };
};