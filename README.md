# Stravalytics - Modern Full-Stack Refactor

A modern web application for analyzing Strava running data with interactive visualizations.

## Project Structure

```
stravalytics/
├── frontend/              # React + TypeScript + Vite
├── backend/               # FastAPI REST API
├── old/                   # Original Flask/Jinja2 app (reference)
└── venv/                  # Python virtual environment
```

## Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Plotly.js** - Interactive visualizations

### Backend

- **FastAPI 0.128** - REST API
- **Pandas 2.3** - Data processing
- **Plotly 6.5** - Chart generation
- **Uvicorn 0.40** - ASGI server

## Setup Instructions

### Prerequisites

- Node.js 22+ and npm 10+
- Python 3.x

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m src.main
```

The backend API will run on `http://localhost:8000`

## Development Workflow

1. Start backend server (FastAPI on port 8000)
2. Start frontend dev server (Vite on port 5173)
3. Frontend makes API calls to backend for data processing
4. Backend returns JSON data
5. Frontend renders visualizations with Plotly

## Original App

The original Flask/Jinja2 implementation is preserved in the `old/` directory for reference.
