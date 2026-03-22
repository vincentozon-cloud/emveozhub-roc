// src/components/SignalLog.tsx
import { TelemetrySignal } from '@/lib/engine/riskScorer';

interface SignalLogProps {
  signals: TelemetrySignal[];
}

export default function SignalLog({ signals }: SignalLogProps) {
  // We sort by newest first and show only the last 10 signals
  const displaySignals = [...signals].reverse().slice(0, 10);

  return (
    <div className="mt-6 border border-zinc-800 bg-black/40 rounded-lg overflow-hidden font-mono text-[10px]">
      <div className="bg-zinc-900/50 p-2 border-b border-zinc-800 flex justify-between items-center">
        <span className="text-zinc-500 uppercase tracking-tighter">Live Telemetry Feed</span>
        <div className="flex items-center gap-2">
           <span className="text-[8px] text-zinc-600 italic">BUFFER_ACTIVE</span>
           <span className="text-blue-500 animate-pulse">● REC</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-zinc-600 border-b border-zinc-800/50 bg-zinc-900/20">
              <th className="p-2 font-normal">TIMESTAMP</th>
              <th className="p-2 font-normal">SIGNAL_ID</th>
              <th className="p-2 font-normal">SEV</th>
              <th className="p-2 font-normal">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {displaySignals.map((signal) => (
              <tr key={signal.id} className="border-b border-zinc-900/50 hover:bg-zinc-800/20 transition-colors">
                <td className="p-2 text-zinc-500 font-mono">
                  {new Date(signal.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
                <td className="p-2 text-blue-900 truncate max-w-25">{signal.id}</td>
                <td className={`p-2 font-bold ${signal.severity > 7 ? 'text-red-500' : 'text-zinc-400'}`}>
                  0{signal.severity}
                </td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-[8px] ${signal.severity > 7 ? 'bg-red-900/20 text-red-500 border border-red-900/50' : 'bg-blue-900/10 text-blue-400 border border-blue-900/30'}`}>
                    {signal.severity > 7 ? 'CRIT_THREAT' : 'LOGGED'}
                  </span>
                </td>
              </tr>
            ))}
            {signals.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-700 italic font-mono uppercase tracking-widest">
                  Waiting for inbound telemetry...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}