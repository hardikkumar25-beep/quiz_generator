from typing import List,Dict,Any,Optional
from pydantic import BaseModel,Field

class QuizOptionLLM(BaseModel):
    text:str=Field(description="the text of an answer option shown to user")

class QuizQuestionLLM(BaseModel):
    question:str=Field(description="A clear question directly related to the requested theme.")
    option:List[QuizOptionLLM]=Field(min_length=4,max_length=4,description="Exactly four plausible answer options, with one correct answer.")
    correct_answer:str=Field(description="The exact text of the correct answer option.")
    order:int=Field(ge=1,description="The question's position in the quiz, starting from 1.")
    explanation:str=Field(description="Explain why the correct answer is correct and teach the underlying concept.")

class QuizContentLLM(BaseModel):
    title:str=Field(description="A concise, engaging title based on the quiz theme.")
    theme:str=Field(description="The theme provided by user")
    questions:List[QuizQuestionLLM]=Field(min_length=1,description="The quiz questions in sequential order.")
