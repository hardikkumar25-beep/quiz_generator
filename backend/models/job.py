from sqlalchemy import Column,Integer,String,DateTime,Boolean,JSON,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base

class QuizJob(Base):
    __tablename__="quiz_job"

    id=Column(Integer,primary_key=True,index=True)
    job_id=Column(String,index=True,unique=True,nullable=False)
    session_id=Column(String,index=True)
    title=Column(String,nullable=False)
    status=Column(String,nullable=False)
    quiz_id=Column(Integer,ForeignKey("quizzes.id"),nullable=True)
    error=Column(String,nullable=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now(),nullable=False)
    completed_at=Column(DateTime(timezone=True),nullable=True)