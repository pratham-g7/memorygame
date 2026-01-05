export const GameHeader = ({score = 0, moves = 0}) => {
    return (
        <header className="game-header">
            <h1>Memory Cards</h1>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-label">Score:</span> 
                    <span className="stat-value">{score}</span></div>

                <div className="stat-item">
                    <span className="stat-label">Moves:</span> 
                    <span className="stat-value">{moves}</span></div>
            </div>
        </header>
    );
};