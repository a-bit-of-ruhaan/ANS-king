# EXAM Answer AI (ANS-KING)

Turn Any Topic Into a EXAM-Ready Answer.
AI-powered exam preparation built for undergraduate theory papers. Generate structured, detailed, easy-to-write answers in seconds.

## Project Overview

EXAM Answer AI is a specialized educational application designed to convert academic topics into comprehensive, exam-ready answers appropriate for University undergraduate theory examinations. It targets approximately 6-7 handwritten pages of content with a structured academic approach.

## Features

- **Answer Generator**: Instantly generate long-form, exam-formatted answers.
- **Exam-Oriented Structure**: Automatically organizes answers with introduction, definitions, classifications, algorithms, diagrams (descriptions), examples, and conclusions.
- **Quick Revision Mode**: Summarizes topics into 1-minute, 5-minute, and before-exam formats.
- **Study Tools**: Copy, save, download, print, regenerate, and simplify answers.
- **History & Favorites**: Access your recently generated topics and bookmark important answers.

## Architecture & Tech Stack

This project uses a modern production-ready full-stack architecture:

- **Frontend**: React, TypeScript, Vite, Tailwind CSS (v4), Framer Motion, Lucide React
- **Backend**: FastAPI, Python, Google Generative AI (Gemini SDK), Uvicorn
- **AI**: Google Gemini 1.5 Flash API

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

## Gemini API Setup

1. Go to Google AI Studio (https://aistudio.google.com/)
2. Create an API Key
3. Add the key to the `GEMINI_API_KEY` environment variable in `backend/.env`.

## Installation & Running

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Database Setup

Currently, the application uses an in-memory state or lightweight structure suitable for local development. For production, the database schema (SQLite/PostgreSQL) can be integrated using SQLAlchemy configured in the FastAPI models directory.

## Production Deployment

- **Frontend**: Build the frontend using `npm run build` and deploy the output (`dist` folder) to Vercel, Netlify, or any static hosting service.
- **Backend**: Deploy the FastAPI application to a platform like Render, Railway, or AWS. Ensure that `GEMINI_API_KEY` is securely set in the production environment variables. Update the `allow_origins` in `main.py` CORS configuration to match your frontend domain.

---
*Built with passion for EXAM Students.*
