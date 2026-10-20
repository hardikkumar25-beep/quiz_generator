from sqlalchemy import Column,Integer,String,DateTime,Boolean,JSON,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base

class Quiz(Base):
    __tablename__="quizzes"

    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,index=True)
    session_id=Column(String,index=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now())

    nodes=relationship(argument="QuizNode",back_populates="quiz")

class QuizNode(Base):
    __tablename__="quiz_nodes"

    id=Column(Integer,primary_key=True,index=True)
    quiz_id=Column(Integer,ForeignKey=("quizzes.id"),index=True)
    question=Column(String,nullable=False)
    options=Column(JSON,nullable=False)
    correct_answer = Column(String, nullable=False)
    order = Column(Integer, nullable=False)

    quiz=relationship(argument="Quiz",back_populates="nodes")

