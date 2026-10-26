from sqlalchemy import Column,Integer,String,DateTime,Boolean,JSON,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base

class Quiz(Base):
    __tablename__="quizzes"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,index=True,nullable=False)
    session_id=Column(String,index=True,nullable=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now(),nullable=False)

    questions=relationship(argument="QuizNode",back_populates="quiz")

class QuizNode(Base):
    __tablename__="quiz_nodes"

    id=Column(Integer,primary_key=True,index=True)
    quiz_id=Column(Integer,ForeignKey("quizzes.id"),index=True,nullable=False)
    questions=Column(String,nullable=False)
    options=Column(JSON,nullable=False)
    correct_answer = Column(String, nullable=False)
    question_order = Column(Integer, nullable=False)
    explanation = Column(String, nullable=True)

    quiz=relationship(argument="Quiz",back_populates="questions")

