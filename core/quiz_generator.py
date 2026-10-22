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
        return ChatOpenAI(model="nvidia/nemotron-3.5-super-vl:free",base_url="https://openrouter.ai")
    @classmethod
    def generate_quiz(cls, db:Session,session_id:str, theme:str)->Quiz:
        llm=cls._get_llm_()
        quiz_parser=PydanticOutputParser(pydantic_object=QuizContentLLM)
        prompt=ChatPromptTemplate.from_messages(
        (    "system",
            SYSTEM_PROMPT
        )
        (
            "human",
            f"Create a quiz with this:{theme}"
        )
        ).partial(format_instructions=quiz_parser.get_format_instructions)

