# Health-Ai

AI-powered personalized nutrition, disease risk prediction, and diet planning. Users sign up, complete a health profile, get ML-based disease risk insight (Type 2 Diabetes, Cardiovascular, Hypertension), a personalized diet plan (with optional Gemini AI explanation), meal logging, and downloadable reports.

## Tech stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Zustand
- **Backend:** Next.js API routes (auth, profile, diet, meal logs, reports)
- **Database:** Neon PostgreSQL with Prisma
- **ML:** Python FastAPI + scikit-learn (Random Forest) for disease risk
- **AI (optional):** Google Gemini for diet plan explanations

## Quick start

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd Diet
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set `DATABASE_URL`, `DIRECT_URL` (from [Neon](https://console.neon.tech)), and `JWT_SECRET`
   - Optional: `GEMINI_API_KEY` for AI diet explanations

3. **Database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Python API** (disease risk models)
   ```bash
   cd python-api
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   python -m app.train_risk_models   # train ML models (once)
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   Keep this running in one terminal.

5. **Next.js app**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

For detailed setup (Neon, Gemini, API usage), see **[SETUP.md](./SETUP.md)**.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB |
| `npm run api:python` | Start Python API (from root, with venv active) |

## Project structure

- `app/` – Next.js pages and API routes
- `components/` – React components (landing, UI)
- `lib/` – Auth, DB, store, Gemini diet, types
- `prisma/` – Schema and migrations
- `python-api/` – FastAPI + ML models for disease risk

---

© Health-Ai – Personalized nutrition and disease risk insight.
