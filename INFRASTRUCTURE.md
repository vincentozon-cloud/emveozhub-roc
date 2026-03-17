# ROC Infrastructure & Security Specification

## 1. Cloud Architecture (AWS Alignment)
The eMVeOzHub ROC is designed to align with the **AWS Shared Responsibility Model**.

* **Compute:** Next.js 15 (deployed via Vercel/AWS Amplify).
* **Identity:** RBAC Middleware enforcing **Least Privilege**.
* **Encryption:** All data in transit is secured via TLS 1.3.

## 2. Security Boundaries (SSCP Domain 4)
* **Public Zone:** Frontend UI protected by Web Application Firewall (WAF).
* **Private Zone:** Backend logic and telemetry ingestion secured within a Private Subnet (Simulated).
* **Access Control:** Just-In-Time (JIT) access principles applied to Administrative triggers.

## 3. Threat Model
* **Target:** Unauthorized Mitigation Execution.
* **Control:** RBAC Schema implemented in `src/middleware.ts`.
* **Audit:** All role-based access attempts logged via system telemetry.