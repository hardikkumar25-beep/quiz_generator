import { useState } from "react";

function QuizPage({quiz,onNewQuiz}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = quiz.nodes[currentQuestionIndex];
    const options = currentQuestion.option;

    
}

export default QuizPage;