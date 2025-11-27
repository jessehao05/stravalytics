# Stravalytics - Modern Full-Stack Refactor

A modern web application for analyzing Strava running data with interactive visualizations.

## Project Structure

```
stravalytics/
├── frontend/              # React + TypeScript + Vite
├── backend/               # Flask REST API
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
- **Flask 3.1** - REST API
- **Pandas 2.3** - Data processing
- **Plotly Express 5.24** - Chart generation
- **Flask-CORS** - Cross-origin support

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
python app.py
```

The backend API will run on `http://localhost:5000`

## Development Workflow

1. Start backend server (Flask on port 5000)
2. Start frontend dev server (Vite on port 5173)
3. Frontend makes API calls to backend for data processing
4. Backend returns JSON data
5. Frontend renders visualizations with Plotly

## Next Steps

- [ ] Refactor Flask app to REST API (remove Jinja2 templates)
- [ ] Add flask-cors for cross-origin requests
- [ ] Build React file upload component
- [ ] Integrate Plotly.js for client-side rendering
- [ ] Add TypeScript types for API responses
- [ ] Implement proper error handling
- [ ] Add loading states and UX improvements

## Original App

The original Flask/Jinja2 implementation is preserved in the `old/` directory for reference.