from typing import List,Optional,Dict
from datetime import datetime
from pydantic import BaseModel,ConfigDict,Field

class QuizOptionsSchema(BaseModel):
    text:str

class QuizNodeBase(BaseModel):
    question:str
    options:List[QuizOptionsSchema]
    correct_answer:str
    order:Optional[int]=None
    explanation:str

class CompleteQuizNodeResponse(QuizNodeBase):
    id:int
    model_config = ConfigDict(from_attributes=True)

class QuizBase(BaseModel):
    title:str
    theme:str

class CreateQuizRequest(BaseModel):
    theme:str
    num_questions:int=Field(default=10,ge=1,le=50)
    difficulty:str="medium" 

class CompleteQuizResponse(QuizBase):
    id:int
    session_id:str |None=None
    created_at:datetime
    questions: list[CompleteQuizNodeResponse]
    model_config = ConfigDict(from_attributes=True)