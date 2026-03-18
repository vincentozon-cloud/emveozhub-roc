'use client'; // Required for hooks

import { useState, useEffect } from 'react';
import { ROLE_PERMISSIONS, UserRole } from '@/lib/auth-config';

export default function Home() {
  const currentUserRole: UserRole = 'monitor'; 
  const permissions = ROLE_PERMISSIONS[currentUserRole];

  // Day 3 ROC: Telemetry State Management
  const [riskScore, setRiskScore] = useState(15);
  const [lastSignal, setLastSignal] = useState<string | null>(null);

  // Simulate Asynchronous Ingestion & Neural Scoring
  useEffect(() => {
    const timer = setInterval(() => {
      const mockSignals = ['AUTH_ATTEMPT', 'SYSTEM_LOG', 'FIREWALL_HIT'];
      const randomSignal = mockSignals[Math.floor(Math.random() * mockSignals.length)];
      
      setLastSignal(randomSignal);
      // Heuristic update simulation
      setRiskScore((prev) => (prev < 95 ? prev + Math.floor(Math.random() * 5) : 15));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="w-full max-w-5xl border border-zinc-800 bg-zinc-900/30 p-12 rounded-xl backdrop-blur-md">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-mono font-bold tracking-tighter text-blue-500">
            eMVeOzHub // ROC_INIT
          </h1>
          <div className="flex justify-between items-center mt-2">
            <p className="text-zinc-500 font-mono text-sm">
              Status: <span className="text-green-500 animate-pulse">SYSTEM_ACTIVE</span>
            </p>
            {lastSignal && (
              <p className="text-[10px] font-mono text-blue-400 animate-bounce">
                RECEIVED: {lastSignal}
              </p>
            )}
          </div>
          <p className="text-xs font-mono text-zinc-600 mt-1 uppercase">
            Access Level: <span className="text-blue-400">{currentUserRole}</span>
          </p>
        </header>

        <section className="grid gap-6">
          {/* Risk Scorer: Updated with Zod-Validated Data simulation */}
          {permissions.canViewTelemetry && (
            <div className="p-6 border border-zinc-800 bg-black/50 rounded-lg">
              <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">
                Neural-Heuristic Risk Scorer
              </h2>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-1000" 
                  style={{ width: `${riskScore}%` }}
                ></div>
              </div>
              <p className="mt-4 font-mono text-sm text-zinc-500">
                Processing Telemetry... {riskScore}%
              </p>
            </div>
          )}

          {/* Mitigation Trigger: ONLY visible to 'operator' or 'admin' */}
          {permissions.canTriggerMitigation ? (
            <button className="p-4 border border-blue-900 bg-blue-950/20 text-blue-400 font-mono text-xs uppercase hover:bg-blue-600 hover:text-white transition-all">
              Execute Automated Mitigation
            </button>
          ) : (
            <div className="p-4 border border-red-900/30 bg-red-950/10 text-red-800 font-mono text-[10px] uppercase">
              Notice: Mitigation controls restricted for [monitor] access
            </div>
          )}
        </section>
      </div>
    </main>
  );
}