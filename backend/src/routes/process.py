from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from ..services.data_processing import process_strava_data, process_example_data

router = APIRouter()

class DefaultRequest(BaseModel):
    action: str

@router.post("/process")
async def process_file(
    action: str | None = Form(None),
    file: UploadFile | None = File(None)
):
    # Handle example data
    if action == "default" or (action is None and file is None):
        try:
            return process_example_data()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    # Handle regular file upload
    if action == "upload" and file:
        try:
            contents = await file.read()
            return process_strava_data(contents)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    raise HTTPException(status_code=400, detail="invalid request")

