export const HighScore = ({score}: {score: number}) => {
    return (
        <div className="high-score">
            <h3>High Score: {score}</h3>
        </div>
    );
};