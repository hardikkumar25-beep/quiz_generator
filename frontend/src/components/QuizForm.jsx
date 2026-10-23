import { useState } from "react";
function FormInput({onSubmit}){
    const [title,setTitle]=useState("")
    const [numQuestions, setNumQuestions] = useState(10);
    const [difficulty, setDifficulty] = useState("medium");
    const [error,setError]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!title.trim()){
            setError("Please enter a title");
            return
        }
        setError("");
        onSubmit({title:title.trim(),num_questions:Number(numQuestions),difficulty});
    };
    return (<div className="title-input-container">
        <h2>Generate Your Quiz</h2>
        <p>Choose your topic, question count, and difficulty.</p>
        <form onSubmit={handleSubmit}> 
            <div className="input-group">
                <label htmlFor="title">Quiz Topic</label>
                <input 
                type="text" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Enter a title...(e.g. World History)"
                className={error ? 'error':''}
                />
                {error && <p className="error-text">{error}</p>}
            </div>
            <div className="input-group">
                <label htmlFor="num_questions">Number of Questions</label>
                <input
                type="number"
                min="1"
                max="50"
                value={numQuestions}
                onChange={(e)=>setNumQuestions(e.target.value)}
                required
                />
            </div>
            <div className="input-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                id="difficulty"
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>             
                    <option value="medium">Medium</option>             
                    <option value="hard">Hard</option>             
                </select>
            </div>
            <button type="submit" className="generate-btn">Generate Quiz</button>
        </form>
    </div>);
}
export default FormInput;