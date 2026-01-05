import type { CardType  } from "../types/cardType"; // adjust path


export const Card = ({ cardData, clickFunc}: {cardData: CardType, clickFunc?: (cardData: CardType) => void}) => {
    return (
        <div className={`card ${cardData.isFlipped || cardData.isMatched ? "flipped" : ""}`} onClick={() => {clickFunc && clickFunc(cardData)}}>
            <div className="card-front">?</div>
            <div className="card-back">{cardData.value}</div>
        </div>
    );
};
