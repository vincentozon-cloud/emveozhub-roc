'use client'; 

import { useState, useEffect, useMemo } from 'react';
import { ROLE_PERMISSIONS, UserRole } from '@/lib/auth-config';
// Day 7 ROC: Integrating the Neural Brain & Mock Telemetry
import { calculateNeuralRisk, getRiskLevel, TelemetrySignal } from '@/lib/engine/riskScorer';
import { generateSlowDripAttack, generateBackgroundNoise } from '@/lib/engine/mock-telemetry';
import SignalLog from '@/components/SignalLog';

export default function Home() {
  const currentUserRole: UserRole = 'monitor'; 
  const permissions = ROLE_PERMISSIONS[currentUserRole];

  // State Management for active telemetry signals
  const [signals, setSignals] = useState<TelemetrySignal[]>([]);
  const [lastSignal, setLastSignal] = useState<string | null>(null);

  // THE BRAIN: Memoized calculation of risk score based on current signal stack
  const riskScore = useMemo(() => calculateNeuralRisk(signals), [signals]);
  const riskStatus = useMemo(() => getRiskLevel(riskScore), [riskScore]);

  // Background Noise Simulation (Standard Operations)
  useEffect(() => {
    const timer = setInterval(() => {
      const noise = generateBackgroundNoise(1);
      setSignals((prev) => [...prev, ...noise].slice(-50)); // Keep last 50 for performance
      setLastSignal(`INBOUND: ${noise[0].origin}`);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // MANUAL TRIGGER: Simulate the "Slow-Drip" Attack
  const triggerSlowDrip = () => {
    const attack = generateSlowDripAttack(12);
    setSignals((prev) => [...prev, ...attack]);
    setLastSignal("CRITICAL: CONSECUTIVE PATTERN DETECTED");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className={`w-full max-w-5xl border border-zinc-800 bg-zinc-900/30 p-12 rounded-xl backdrop-blur-md transition-shadow duration-500 ${riskStatus.glow}`}>
        
        {/* Header Section */}
        <header className="mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-mono font-bold tracking-tighter text-blue-500">
            eMVeOzHub // RISK_OPERATIONS_CENTER
          </h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-zinc-500 font-mono text-sm">
              Status: <span className={`${riskStatus.color} animate-pulse`}>{riskStatus.label}</span>
            </p>
            {lastSignal && (
              <p className="text-[10px] font-mono text-blue-400">
                TELEMETRY: {lastSignal}
              </p>
            )}
          </div>
        </header>

        <section className="grid gap-6">
          {/* Neural-Heuristic Risk Pulse */}
          {permissions.canViewTelemetry && (
            <div className="p-6 border border-zinc-800 bg-black/50 rounded-lg">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                  Neural-Heuristic Risk Engine
                </h2>
                <span className={`font-mono text-xl font-bold ${riskStatus.color}`}>
                  {riskScore.toFixed(2)}
                </span>
              </div>
              
              {/* Dynamic Progress Bar */}
              <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    riskScore > 15 ? 'bg-red-600' : riskScore > 8 ? 'bg-amber-500' : 'bg-blue-600'
                  }`} 
                  style={{ width: `${Math.min((riskScore / 25) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Simulation Controls - The "Portfolio" Proof */}
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={triggerSlowDrip}
                  className="px-4 py-2 border border-zinc-700 bg-zinc-800/50 text-zinc-300 font-mono text-[10px] hover:bg-red-900/20 hover:text-red-400 transition-all"
                >
                  RUN_SIMULATION: SLOW_DRIP_ATTACK
                </button>
                <button 
                  onClick={() => setSignals([])}
                  className="px-4 py-2 border border-zinc-700 bg-zinc-800/50 text-zinc-300 font-mono text-[10px] hover:bg-zinc-100 hover:text-black transition-all"
                >
                  PURGE_TELEMETRY_CACHE
                </button>
              </div>

              {/* NEW: Signal Log visualization integrated within the telemetry section */}
              <SignalLog signals={signals} />
            </div>
          )}

          {/* Mitigation Trigger Logic */}
          {permissions.canTriggerMitigation ? (
            <button className="p-4 border border-blue-900 bg-blue-950/20 text-blue-400 font-mono text-xs uppercase hover:bg-blue-600 hover:text-white transition-all">
              Execute Automated Mitigation
            </button>
          ) : (
            <div className="p-4 border border-red-900/30 bg-red-950/10 text-red-800 font-mono text-[10px] uppercase text-center">
              SYSTEM_NOTICE: Access Restricted for role [{currentUserRole}]
            </div>
          )}
        </section>
      </div>
    </main>
  );
}