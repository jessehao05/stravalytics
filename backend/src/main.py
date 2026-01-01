from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import process

app = FastAPI(title="Stravalytics API")

# CORS
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:5174",  # Alternative Vite port
    "http://127.0.0.1:5173",  # Alternative localhost
]

# Add production origins when deploying
# origins.append("https://your-app.vercel.app")
# origins.append("https://*.vercel.app")  # For preview deployments

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(process.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Stravalytics API"}

if __name__ == "__main__": 
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)