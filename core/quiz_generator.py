from sqlalchemy.orm import Session
from core.config import settings

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import SYSTEM_PROMPT
from models.quiz import Quiz
from core.models import QuizContentLLM,QuizQuestionLLM

class QuizGenerator:
    @classmethod
    def _get_llm_(cls):
        return ChatOpenAI(model="nvidia/nemotron-3.5-super-vl:free",base_url="https://openrouter.ai",api_key=settings.OPENROUTER_API_KEY,temperature=0.7)
    @classmethod
    def generate_quiz(cls, db:Session,session_id:str, theme:str,num_question:int=10,difficulty:str="medium")->Quiz:
        llm=cls._get_llm_()
        quiz_parser=PydanticOutputParser(pydantic_object=QuizContentLLM)
        prompt=ChatPromptTemplate.from_messages([
        ("system",SYSTEM_PROMPT)
        (
            "human",
            """
            Generate a quiz with these settings:
            Theme: {theme}
            Number of questions: {num_questions}
            Difficulty: {difficulty}
            {format_instructions}
            """
        ),])
        chain = prompt | llm | quiz_parser
        quiz_structure=chain.invoke({
            "theme":theme,
            "num_questions":num_question,
            "difficulty":difficulty,
            "format_instructions":quiz_parser.get_format_instructions(),
        })
        quiz_db=Quiz(title=quiz_structure.title,session_id=session_id)
        db.add(quiz_db)
        db.flush()
        for question_data in quiz_structure.questions:
            question_db=Quiz(quiz_id=quiz_db.id,question=question_data.question,options=[option.model_dump() for option in question_data.option],correct_answer=question_data.correct_answer,question_order=question_data.order)
            db.add(question_db)
        db.commit()
        db.refresh(quiz_db)
        return quiz_db


