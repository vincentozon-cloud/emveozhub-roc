// src/app/page.tsx
import { ROLE_PERMISSIONS, UserRole } from '@/lib/auth-config';

export default function Home() {
  // SIMULATION: This would eventually come from a cookie or session
  const currentUserRole: UserRole = 'monitor'; 
  const permissions = ROLE_PERMISSIONS[currentUserRole];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="w-full max-w-5xl border border-zinc-800 bg-zinc-900/30 p-12 rounded-xl backdrop-blur-md">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-mono font-bold tracking-tighter text-blue-500">
            eMVeOzHub // ROC_INIT
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-2">
            Status: <span className="text-green-500 animate-pulse">SYSTEM_ACTIVE</span>
          </p>
          <p className="text-xs font-mono text-zinc-600 mt-1 uppercase">
            Access Level: <span className="text-blue-400">{currentUserRole}</span>
          </p>
        </header>

        <section className="grid gap-6">
          {/* Risk Scorer: Visible to all authorized roles */}
          {permissions.canViewTelemetry && (
            <div className="p-6 border border-zinc-800 bg-black/50 rounded-lg">
              <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">
                AI-Driven Risk Scorer
              </h2>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[15%] transition-all duration-1000"></div>
              </div>
              <p className="mt-4 font-mono text-sm text-zinc-500">
                Initializing neural weights... 15%
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