import pytest
from fastapi.testclient import TestClient
from src.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app"""
    return TestClient(app)


@pytest.fixture
def sample_strava_csv():
    """Sample valid Strava CSV data as bytes"""
    csv_content = """Activity Date,Activity Name,Activity Type,Activity Description,Elapsed Time,Moving Time,Distance,Elevation Gain,Elevation Loss
"Jan 15, 2024, 10:30:00 AM",Morning Run,Run,Easy pace,1800,1740,5.2,50,45
"Feb 20, 2024, 6:00:00 PM",Evening Run,Run,Tempo run,2100,2040,6.5,75,70
"Mar 10, 2024, 8:00:00 AM",Long Run,Run,Long slow distance,3600,3480,10.3,120,115"""
    return csv_content.encode('utf-8')


@pytest.fixture
def invalid_csv():
    """Invalid CSV data missing required columns"""
    csv_content = """Date,Name,Distance
2024-01-15,Morning Run,5.2"""
    return csv_content.encode('utf-8')
