import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "./QuizForm.jsx";
import LoadingStatus from "./LoadingStatus.jsx";

const API_BASE_URL = "/api";

function QuizGenerator() {
    const navigate = useNavigate();
    const [jobId, setJobId] = useState(null);
    const [jobStatus, setJobStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const pollJobStatus = useCallback(async (id) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/jobs/${id}`
            );

            const { status, quiz_id, error: jobError } = response.data;

            setJobStatus(status);

            if (status === "completed") {
                if (quiz_id) {
                    setLoading(false);
                    navigate(`/quiz/${quiz_id}`);
                } else {
                    setError("Quiz generation completed without a quiz ID.");
                    setLoading(false);
                }
            } else if (status === "failed") {
                setError(jobError || "Failed to generate quiz.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Failed to check quiz status:", err);
            setError(
                `Failed to check quiz status: ${
                    err.response?.data?.detail || err.message
                }`
            );
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (!jobId || !loading) {
            return;
        }

        if (jobStatus === "completed" || jobStatus === "failed") {
            return;
        }

        const pollInterval = setInterval(() => {
            pollJobStatus(jobId);
        }, 3000);

        return () => clearInterval(pollInterval);
    }, [jobId, jobStatus, loading, pollJobStatus]);

    const generateQuiz = async ({ title, numQuestions, difficulty }) => {
        setLoading(true);
        setError(null);
        setJobId(null);
        setJobStatus(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/quizzes/create`,
                {
                    title: title,
                    num_questions: Number(numQuestions ?? 10),
                    difficulty,
                }
            );

            const { job_id, status } = response.data;

            setJobId(job_id);
            setJobStatus(status);

            await pollJobStatus(job_id);
        } catch (err) {
            console.error("Failed to create quiz:", err);
            setError(
                `Failed to generate quiz: ${
                    err.response?.data?.detail || err.message
                }`
            );
            setLoading(false);
        }
    };

    const reset = () => {
        setJobId(null);
        setJobStatus(null);
        setError(null);
        setLoading(false);
    };

    if (loading) {
        return (
            <div>
                <LoadingStatus title="quiz" />
                <p>Generating your quiz. This may take a little while.</p>
                {jobStatus && <p>Status: {jobStatus}</p>}
                {error && <p className="error-message">{error}</p>}
                <button onClick={reset}>Back to form</button>
            </div>
        );
    }

    return (
        <div className="quiz-generator">
            <FormInput onSubmit={generateQuiz} />

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={reset}>Try again</button>
                </div>
            )}
        </div>
    );
}

export default QuizGenerator;