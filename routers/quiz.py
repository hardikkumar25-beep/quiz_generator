import uuid
from typing import Optional
from datetime import datetime
from fastapi import APIRouter,Depends,HTTPException,Cookie,Response,BackgroundTasks
from sqlalchemy.orm import Session

from db.database import get_db,SessionLocal
from models.quiz import Quiz
from models.job import QuizJob
from schemas.quiz import CompleteQuizResponse,CreateQuizRequest
from schemas.job import QuizJobResponse

router=APIRouter(prefix="/quizzes",tags=["quizzes"])

def get_session_id(session_id: Optional[str]=Cookie(None)):
    if not session_id:
        session_id=str(uuid.uuid4())
    return session_id

@router.post("/create",response_model=QuizJobResponse)
def create_quiz(request: CreateQuizRequest,background_tasks:BackgroundTasks,response:Response,session_id:str=Depends(get_session_id),db:Session=Depends(get_db)):
    response.set_cookie(key="session_id",value=session_id,httponly=True)
    job_id=str(uuid.uuid4())
    job=QuizJob(job_id=job_id,
                session_id=session_id,
                theme=request.theme,
                status="pending")
    db.add(job)
    db.commit()
    #todo add bg tasks, generate story
    background_tasks.add_task(generate_quiz_task,job_id=job_id,theme=request.theme,session_id=session_id)
    return job

def generate_quiz_task(job_id:str,theme:str,session_id:str):
    db=SessionLocal()
    try:
        job=db.query(QuizJob),filter(QuizJob.job_id==job_id).first()
        if not job:
            return
        try:
            job.status="processing"
            db.commit()
            quiz={} #todo generate quiz
            job.quiz_id=1 #todo update quiz id
            job.status="completed"
            job.completed_at=datetime.now()
            db.commit()
        except Exception as e:
            job.status="failed"
            job.completed_at=datetime.now()
            job.error=str(e)
            db.commit()
    finally:
        db.close()

@router.get("{quiz_id}/complete",response_model=CompleteQuizResponse)
def get_complete_quiz(quiz_id:int,db:Session=Depends(get_db)):
    quiz=db.query(Quiz),filter(Quiz.id==quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404,detail="Quiz not found")
    complete_quiz=build_complete_quiz(db,quiz)
    return quiz

def build_complete_quiz(db:Session,quiz:Quiz)->CompleteQuizResponse:
    pass