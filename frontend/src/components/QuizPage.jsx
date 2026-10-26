import {useState, useEffect} from "react";

function QuizPage({quiz, onNewQuiz}){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(()=>{
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
        setAnswers([]);
        setIsFinished(false);
    },[quiz]);
    if (!quiz || !quiz.questions || quiz.questions.length==0){
        return <div className="quiz-page">No questions avaialable.</div>;
    }
    const currentQuestion=quiz.questions[currentQuestionIndex];
    const options=currentQuestion.options;
    const isCorrect=selectedAnswer===currentQuestion.correct_answer;
    const score=answers.filter((answer)=>answer.isCorrect).length;
    const chooseAnswer=(answerText)=>{
        if (!isAnswerSubmitted){
            setSelectedAnswer(answerText);
        }
    };
    const submitAnswer=()=>{
        if (selectedAnswer===null||isAnswerSubmitted){
            return;
        }
        const correct= selectedAnswer===currentQuestion.correct_answer
        setAnswers((previousAnswers)=>[
            ...previousAnswers,
            {
                questionId:currentQuestion.id,
                question:currentQuestion.question,
                selectedAnswer,
                correctAnswer:currentQuestion.correct_answer,
                isCorrect:correct,
            },
        ]);
        setIsAnswerSubmitted(true);
    };
    const nextQuestion = () => {
        if (currentQuestionIndex === quiz.questions.length - 1) {
            setIsFinished(true);
            return;
        }

        setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
    };
    const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setAnswers([]);
    setIsFinished(false);
    };
    if (isFinished){
        return (
            <div className="quiz-page">
                <header className="quiz-header">
                    <h2>{quiz.title}</h2>
                </header>
                <div className="quiz-results">
                    <h3>Quiz Completed</h3>
                    <p>Your score: {score} /{quiz.questions.length}</p>
                    <p>You answered {score} out of {""} {quiz.questions.length} questions.</p>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                    {onNewQuiz && (
                        <button onClick={onNewQuiz}>Generate New Quiz</button>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="quiz-page">
            <header className="quiz-header">
                <h2>{quiz.title}</h2>
                <p>Question {currentQuestionIndex + 1} of {""} {quiz.questions.length}</p>
            </header>
            <div className="quiz-content">
                <div className="quiz-question">
                    <h3>{currentQuestion.question}</h3>
                    <div className="options-list">
                        {options.map((option,index)=>(
                            <button
                            key={index}
                            onClick={()=>chooseAnswer(option.text)}
                            disabled={isAnswerSubmitted}
                            className={
                                selectedAnswer===option.text? "option-btn selected":"option-btn"
                            }
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                    {isAnswerSubmitted &&  (
                        <div className="answer-feedback">
                            <p>{isCorrect ? "Correct!":"Incorrect."}</p>
                            {!isCorrect && (
                                <p>
                                Corrected Answer:{" "}
                                {currentQuestion.correct_answer}
                                </p>
                            )}
                            <p>{currentQuestion.explanation}</p>
                        </div>
                    )}
                </div>
                <div className="quiz-controls">
                    {!isAnswerSubmitted ? (
                        <button onClick={submitAnswer}
                        disabled={selectedAnswer===null}
                        >
                            Submit Answer
                        </button>
                    ):(
                        <button onClick={nextQuestion}>
                            {currentQuestionIndex===quiz.questions.length-1 
                            ?"View Results"
                            :"Next Question"}
                        </button>
                    )}
                </div>
                <p>Score: {score} / {answers.length}</p>
                <button onClick={restartQuiz} className="reset-btn">
                    Restart Quiz
                </button>
                {onNewQuiz && (
                    <button onClick={onNewQuiz} className="new-quiz-btn">
                        Generate New Quiz
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuizPage;