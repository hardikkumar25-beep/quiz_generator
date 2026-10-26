import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import LoadingStatus from "./LoadingStatus.jsx";
import QuizPage from "./QuizPage.jsx";

const API_BASE_URL="/api"
function QuizLoader(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [quiz,setQuiz]=useState(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null);

    useEffect(()=>{
        loadQuiz(id)
    },[id])

    const loadQuiz=async(quizId)=>{
        setLoading(true)
        setError(null)
        try{
            const response=await axios.get(`${API_BASE_URL}/quizzes/${quizId}/complete`)
            setQuiz(response.data)
            setLoading(false)

        }catch (err){
            if (err.response?.status==404){
                setError("Quiz not found")
            }else{
                setError("Failed to load quiz")
            }
        }finally{
            setLoading(false)
        }
    };
    const createNewQuiz=()=>{
    navigate("/")};

if (loading){
    return (<LoadingStatus title={"quiz"}/>);
}
if (error){
    return (<div className="quiz-loader">
        <div className="error-message">
            <h2>Quiz not found</h2>
            <p>{error}</p>
            <button onClick={createNewQuiz}>Go to Quiz Generator</button>
        </div>
    </div>);
}
if (quiz) {
    return (
        <QuizPage
            quiz={quiz}
            onNewQuiz={createNewQuiz}
        />);
}
    return null;
}
export default QuizLoader;