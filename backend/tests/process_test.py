import pytest
from io import BytesIO


class TestProcess:
    """Tests for the /api/process endpoint"""

    def test_root_endpoint(self, client):
        """Test the root endpoint returns welcome message"""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Stravalytics API"}

    def test_process_default_action(self, client):
        """Test processing with default/example data"""
        response = client.post(
            "/api/process",
            data={"action": "default"}
        )

        assert response.status_code == 200
        data = response.json()

        # Verify response structure
        assert "totalSummary" in data
        assert "yearlySummary" in data
        assert "charts" in data

        # Verify totalSummary structure
        assert "Activities" in data["totalSummary"]
        assert "Distance (mi)" in data["totalSummary"]
        assert "Moving Time (hr)" in data["totalSummary"]
        assert "Elevation Gain (ft)" in data["totalSummary"]

        # Verify charts structure
        assert "distanceHist" in data["charts"]
        assert "paceDistrib" in data["charts"]
        assert "monthDistrib" in data["charts"]
        assert "pie" in data["charts"]

    def test_process_no_params_uses_default(self, client):
        """Test that no params defaults to example data"""
        response = client.post("/api/process")

        assert response.status_code == 200
        data = response.json()
        assert "totalSummary" in data
        assert "yearlySummary" in data
        assert "charts" in data

    def test_process_upload_valid_file(self, client, sample_strava_csv):
        """Test uploading a valid Strava CSV file"""
        response = client.post(
            "/api/process",
            data={"action": "upload"},
            files={"file": ("activities.csv", sample_strava_csv, "text/csv")}
        )

        # Print error details if test fails
        if response.status_code != 200:
            print(f"\nStatus: {response.status_code}")
            print(f"Error: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        # Verify response structure
        assert "totalSummary" in data
        assert "yearlySummary" in data
        assert "charts" in data

        # Verify we processed 3 activities from sample data
        assert data["totalSummary"]["Activities"] == 3

    def test_process_upload_invalid_csv(self, client, invalid_csv):
        """Test uploading invalid CSV raises error"""
        response = client.post(
            "/api/process",
            data={"action": "upload"},
            files={"file": ("invalid.csv", invalid_csv, "text/csv")}
        )

        assert response.status_code == 500
        assert "detail" in response.json()

    def test_process_upload_without_file(self, client):
        """Test upload action without file raises error"""
        response = client.post(
            "/api/process",
            data={"action": "upload"}
        )

        assert response.status_code == 400
        assert response.json()["detail"] == "invalid request"

    def test_process_invalid_action(self, client):
        """Test invalid action raises error"""
        response = client.post(
            "/api/process",
            data={"action": "invalid_action"}
        )

        assert response.status_code == 400
        assert response.json()["detail"] == "invalid request"

    def test_yearly_summary_structure(self, client):
        """Test that yearly summary has correct structure"""
        response = client.post("/api/process", data={"action": "default"})

        assert response.status_code == 200
        data = response.json()
        yearly = data["yearlySummary"]

        # Verify it's a list
        assert isinstance(yearly, list)

        # If there are years, verify structure
        if len(yearly) > 0:
            first_year = yearly[0]
            assert "Year" in first_year
            assert "Activities" in first_year
            assert "Distance (mi)" in first_year
            assert "Moving Time (hr)" in first_year
            assert "Elevation Gain (ft)" in first_year

    def test_charts_are_json_strings(self, client):
        """Test that charts are returned as JSON strings (Plotly format)"""
        response = client.post("/api/process", data={"action": "default"})

        assert response.status_code == 200
        data = response.json()
        charts = data["charts"]

        # Each chart should be a JSON string (from plotly.to_json())
        for chart_name in ["distanceHist", "paceDistrib", "monthDistrib", "pie"]:
            assert isinstance(charts[chart_name], str)
            # Verify it's valid JSON by checking it starts with {
            assert charts[chart_name].startswith("{")

