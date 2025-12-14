const Result = ({ quizData, userAnswers, onRestart }) => {
    const score = userAnswers.reduce((total, answerIndex, i) => {
        if (quizData[i].options[answerIndex] === quizData[i].answer) {
            return total + 1;
        }
        return total;
    }, 0);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h2>Result</h2>
                <p>
                    Score: {score} / {quizData.length} points
                </p>
            </div>

            <div className="nav-buttons d-flex justify-content-center">
                <button id="result" onClick={onRestart}>Restart</button>
            </div>
        </>
    );
};

export default Result
