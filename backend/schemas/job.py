from typing import List,Optional,Dict
from datetime import datetime
from pydantic import BaseModel,ConfigDict,Field

class QuizJobBase(BaseModel):
    theme:str

class QuizJobResponse(BaseModel):
    job_id:str
    status:str
    created_at:datetime
    quiz_id:Optional[int]=None
    completed_at:Optional[datetime]=None
    error:Optional[str]=None
    model_config=ConfigDict(from_attributes=True)

class QuizJobCreate(QuizJobBase):
    pass