from sqlalchemy import Column,Integer,String,DateTime,Boolean,JSON,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base

class Quiz(Base):
    __tablename__="quizzes"

    id=Column(Integer,primary_key=True,index=True)
    job_id=Column(String,index=True,unique=True)
    session_id=Column(String,index=True)
    theme=Column(String)
    status=Column(String)
    story_id=Column(Integer,nullable=True)
    error=Column(String,nullable=true)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
    created_at=Column(DateTime(timezone=True),nullable=True)
    
    