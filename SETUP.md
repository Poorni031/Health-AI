# Health-Ai – Setup Guide

## 1. Database (Neon PostgreSQL + Prisma)

1. Create a project at [Neon Console](https://console.neon.tech) and copy the connection strings.
2. Create `.env` in the project root (see `.env.example`):

```env
DATABASE_URL="postgresql://...?sslmode=require"   # pooled (for app)
DIRECT_URL="postgresql://...?sslmode=require"      # direct (for migrations)
JWT_SECRET="your-secret-at-least-32-characters"
PYTHON_API_URL="http://localhost:8000"
NEXT_PUBLIC_PYTHON_API_URL="http://localhost:8000"
```

3. Push schema and generate client:

```bash
npm run db:generate
npm run db:push
# Or for migrations: npm run db:migrate
```

## 2. Python API (Disease risk + explainability)

From project root:

```bash
cd python-api
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or: `npm run api:python` (from root, if `uvicorn` is in PATH).

- Health: http://localhost:8000/health  
- Risk: `POST http://localhost:8000/api/risk` with JSON body (see `python-api/app/schemas.py`).

## 3. Gemini API (AI personalized diet + explanation)

For 100% personalized diet plans and simple-language explanations:

1. Get an API key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Add to `.env`:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   ```
3. When generating a diet plan (onboarding or “Regenerate” on the diet plan page), the app will call Gemini with the user’s profile, BMI, disease risks, and goals. The response is saved as the diet plan and the **explanation** is shown in simple language on the diet plan page.

If `GEMINI_API_KEY` is not set, the app falls back to the built-in rule-based Indian meal plan (no AI explanation).

## 4. Next.js app

```bash
npm run dev
```

Open http://localhost:3000.

## 5. API usage (from frontend)

- **Auth:**  
  - `POST /api/auth/signup` – body: `{ name, email, password }`  
  - `POST /api/auth/login` – body: `{ email, password }`  
  - Both return `{ user, token }`.  
  - `GET /api/auth/me` – header: `Authorization: Bearer <token>`  

- **Health profile:**  
  - `GET /api/health/profile` – returns profile + disease risks (with explanations).  
  - `POST /api/health/profile` – body: full health/lifestyle/food/medical fields; calls Python risk API and saves profile + risks.  

- **Diet plan:**  
  - `GET /api/diet/plan` – current plan.  
  - `POST /api/diet/plan` – generate and save new plan (Indian meal–based from health profile).  

- **Meal logs:**  
  - `GET /api/meal-logs?date=YYYY-MM-DD` – logs for date.  
  - `POST /api/meal-logs` – body: `{ date?, mealType, items, description?, calories, protein, carbs, fat, fiber? }`.  

- **Reports:**  
  - `GET /api/reports/daily?date=YYYY-MM-DD` – daily summary and adherence.  
  - `GET /api/reports/weekly?end=YYYY-MM-DD` – weekly averages and insights.  
  - `GET /api/reports/monthly?year=YYYY&month=M` – monthly summary and achievements.  

All routes except signup/login require: `Authorization: Bearer <token>`.

## 6. Wiring the existing frontend to the API

1. On login/signup success, store `token` (e.g. in `localStorage` or a cookie) and optionally keep the same Zustand store for `user` from the response.
2. For every API request to `/api/*`, add header: `Authorization: Bearer <token>`.
3. Replace in-memory store updates (e.g. `setHealthProfile`, `setCurrentDietPlan`, `addMealLog`) with `fetch('/api/health/profile', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify(...) })` and then refetch or update state from the response.
4. On app load, call `GET /api/auth/me` with the stored token; if 401, clear token and redirect to login. If 200, set user and `hasHealthProfile`; if no profile, redirect to onboarding.
5. **Explainable risk:** The health profile API returns `overallExplanation` and each risk has `explanation`. Show these in the dashboard and reports UI.
6. **Indian diet options:** The health profile already has `cuisinePreference` (e.g. `indian`, `south_indian`, `north_indian`). The onboarding form can offer: South Indian, North Indian, Veg, Non-Veg, Eggetarian; map these to `cuisinePreference` and `dietPreference` when calling `POST /api/health/profile`.
