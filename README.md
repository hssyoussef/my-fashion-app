# Atelier AI — Fashion Assistant & Virtual Try-On (Frontend)

An ultra-modern, luxury AI fashion styling platform built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**, implementing the complete blueprint for **Marqo SigLIP semantic event recommendations** and **IDM-VTON virtual try-on**.

---

## 🌟 Key Features (Mapped to Blueprint Phases)

### Phase 5 — 3-Step User Interface

1. **Step 1: Onboarding & Digital Persona Calibration**
   - Front-facing portrait upload (file drag & drop, image URL, or curated fashion model presets).
   - Event pill selector (`Party`, `Date Night`, `Casual Chic`, `Formal Gala`, `Summer Resort`, `Executive`, `Streetwear`).
   - Style aesthetic tags (*Quiet Luxury*, *Avant-Garde*, *Old Money*, etc.).

2. **Step 2: Recommendations & Custom Ingestion**
   - **Marqo/marqo-fashionSigLIP + ChromaDB** vector search simulator & live API ranker.
   - Dynamic re-ranking when switching event occasions.
   - **"Add Custom Clothes" pipeline modal** (Phase 3):
     - Background removal extraction preview (*rembg*).
     - Cloudinary public URL dispatch.
     - 768-D dense SigLIP embedding generation.
     - ChromaDB collection ingestion.
   - Deep vector inspection tool to preview embedding vectors and similarity metrics.

3. **Step 3: IDM-VTON Virtual Try-On Studio**
   - Realistic multi-stage diffusion progress telemetry:
     1. Pose & DensePose landmark alignment.
     2. TPS garment cloth warping.
     3. IDM-VTON serverless diffusion denoising (Replicate / Fal.ai).
     4. Lighting & shadow harmonization.
   - **Interactive Split Comparison Slider**: Horizontal slider handle to compare before (original user photo) vs. after (AI virtual try-on).
   - Side-by-side mode toggle.
   - Personal **Virtual Lookbook** to save and archive styled looks.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
cd C:\Users\lenovo\.gemini\antigravity\scratch\my-fashion-app\frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Connect to FastAPI Backend
By default, the frontend includes a high-fidelity interactive simulation mode that works 100% out of the box with zero external dependencies.

To connect your live FastAPI backend:
1. Start your backend: `uvicorn main:app --reload` (running on `http://localhost:8000`).
2. Click the **API / Mode** pill in the top-right corner of the navbar.
3. Switch from **Interactive Demo** to **Live FastAPI**.
4. Test the ping to verify the `/health` endpoint.

---

## 📁 Project Structure

```
my-fashion-app/
├── backend/                  # FastAPI Python backend (Phase 1-4)
│   ├── main.py
│   ├── services.py
│   └── requirements.txt
└── frontend/                 # Next.js UI (Phase 5)
    ├── app/
    │   ├── globals.css       # Luxury dark mode, gold gradient, and typography
    │   ├── layout.tsx        # Next.js Root layout
    │   └── page.tsx          # Master 3-step state orchestrator
    ├── components/
    │   ├── Navbar.tsx        # Brand header, step tabs, lookbook & API status
    │   ├── StepIndicator.tsx # 3-step visual progress bar
    │   ├── OnboardingStep.tsx# Step 1: Portrait upload & event pills
    │   ├── RecommendationsStep.tsx # Step 2: SigLIP feed & vector search
    │   ├── TryOnStudioStep.tsx     # Step 3: IDM-VTON interactive split slider
    │   ├── AddClothesModal.tsx     # Phase 3 rembg & ChromaDB ingestion modal
    │   ├── LookbookModal.tsx       # Saved try-on outfits drawer
    │   └── BackendSettingsModal.tsx# FastAPI URL & API credentials config
    ├── lib/
    │   ├── api-service.ts    # FastAPI client & fallback simulator
    │   └── fashion-data.ts   # Curated models, clothing catalog & vector prompts
    └── types/
        └── fashion.ts        # TypeScript data contracts
```
