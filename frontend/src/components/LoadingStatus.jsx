function LoadingStatus({title}){
    return <div className="loading-container">
        <h2>Generating Your {title} quiz</h2>
        <div className="loading-animation">
            <div className="spinner"></div>
        </div>
        <p className="loading-info">Please wait while we generate your quiz...</p>
    </div>

}
export default LoadingStatus;