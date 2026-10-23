import uuid
from typing import Optional
from fastapi import APIRouter,Depends,HTTPException,Cookie
from sqlalchemy.orm import Session

from db.database import get_db,SessionLocal
from models.job import QuizJob
from schemas.job import QuizJobResponse

router=APIRouter(prefix="/jobs",tags=["jobs"])

@router.get("/{job_id}",response_model=QuizJobResponse)
def get_job_status(job_id:str,db:Session=Depends(get_db)):
    job=db.query(QuizJob).filter(QuizJob.job_id==job_id).first()
    if not job:
        raise HTTPException(status_code=404,detail="Job not found")
    return job
