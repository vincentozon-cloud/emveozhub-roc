# eMVeOzHub // Risk Operations Center (ROC) 

> **Guiding Principle:** Fail-Safe by Design. Secure by Default.

## Project Overview
The eMVeOzHub ROC is a high-performance security monitoring dashboard engineered to identify sophisticated threats. By utilizing a **Neural-Heuristic Engine**, the ROC calculates risk based on signal frequency, severity, and temporal decay.

### The "Slow-Drip" Solution
Most SOCs fail to detect **Low-and-Slow Exfiltration**. 
**Our Solution:** The ROC implements a **Time-Decay Accumulator** ($Risk = \sum (Severity \times e^{-\lambda t})$). It identifies malicious patterns before they reach critical impact.

---

## Technical Architecture
* **Framework:** Next.js 15 (React Compiler) for high-efficiency state management.
* **Database:** PostgreSQL (Supabase) with dual-connection architecture.
* **ORM:** Prisma 7.6.0 (Bleeding Edge) utilizing decoupled TypeScript configuration.
* **Data Integrity:** Strict telemetry validation using **Zod** and **UUID v4**.
* **Security Posture:** Zero-Trust component architecture; `.env` credentials shielded via explicit gitignore hardening.

---

## Core Features
1.  **Neural-Weighted Risk Scorer:** Real-time calculation of $Risk = (Severity \times Frequency) / Confidence$.
2.  **Persistent Telemetry:** Cloud-hosted PostgreSQL backend for long-term threat auditing.
3.  **Dual-Pipe Connection:** Optimized pooling for app requests (Port 6543) and direct pipes for schema migrations (Port 5432).
4.  **Asynchronous Ingestion:** Non-blocking capture layer designed to handle high-velocity threat spikes.

---

## Installation & Setup
1. **Clone & Install:**
   ```bash
   git clone [https://github.com/vincentozon-cloud/emveozhub-roc.git](https://github.com/vincentozon-cloud/emveozhub-roc.git)
   npm install