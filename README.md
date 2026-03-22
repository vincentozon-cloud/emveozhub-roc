# eMVeOzHub // Risk Operations Center (ROC) 

> **Guiding Principle:** Fail-Safe by Design. Secure by Default.

## Project Overview
The eMVeOzHub ROC is a high-performance security monitoring dashboard engineered to identify sophisticated threats that evade traditional threshold-based alerts. By utilizing a **Neural-Heuristic Engine**, the ROC calculates risk based on signal frequency, severity, and temporal decay.

### The "Slow-Drip" Solution
Most SOCs fail to detect **Low-and-Slow Exfiltration**—attacks where a compromised account performs minor unauthorized actions over a long period. 
**Our Solution:** The ROC implements a **Time-Decay Accumulator** ($Risk = \sum (Severity \times e^{-\lambda t})$). It "remembers" low-severity signals and identifies malicious patterns (clusters) before they reach critical impact.

---

## Technical Architecture
* **Framework:** Next.js 15 (React Compiler) for high-efficiency state management.
* **Neural Engine:** Custom TypeScript logic for heuristic risk scoring and probability calculation.
* **Data Integrity:** Strict telemetry validation using **Zod** and **UUID v4** for collision-free auditing.
* **Security Posture:** Zero-Trust component architecture with role-based access simulations.
* **Styling:** Tailwind CSS v4 (CSS-first engine) with dynamic "Threat-Level" UI glow effects.

---

## Core Features
1.  **Neural-Weighted Risk Scorer:** Real-time calculation of $Risk = (Severity \times Frequency) / Confidence$.
2.  **Asynchronous Ingestion:** Non-blocking capture layer designed to handle high-velocity threat spikes.
3.  **Threat Simulation:** Integrated "Slow-Drip" attack generator to validate heuristic thresholds.
4.  **Identity Handshake:** Role-based UI masking to prevent unauthorized mitigation triggers.

---

## Installation & Deployment
1. **Clone the Repository:**
   `git clone https://github.com/vincentozon-cloud/emveozhub-roc.git`
2. **Install Dependencies:**
   `npm install`
3. **Environment Setup:**
   Ensure `uuid` and `zod` are present in `package.json`.
4. **Launch ROC:**
   `npm run dev`

---
**Michael Vincent Ozon** | *IT Security & Network Operations Lead*