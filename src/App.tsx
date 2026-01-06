import { useEffect, useState } from 'react';
import { Card } from './components/card';
import { GameHeader } from './components/gameHeader';
import type { CardType } from './types/cardType';
import { HighScore } from './components/highScore';

const cardValues = [
  [
  "🍇", "🍈", "🍉", "🍊", "🍎", "🍌", "🍐", "🍋‍🟩", 
  "🍇", "🍈", "🍉", "🍊", "🍎", "🍌", "🍐", "🍋‍🟩"],
  [
    "😯", "😝", "😓", "😶‍🌫️", "😴", "🥰", "😎", "🤗",
    "😯", "😝", "😓", "😶‍🌫️", "😴", "🥰", "😎", "🤗"],
  [
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱",
    "⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉" , "🎱"]
][Math.floor(Math.random()*3)];

function shuffle(array: Array<string>) {

  let new_arr = array

  let currentIndex = new_arr.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [new_arr[currentIndex], new_arr[randomIndex]] = [
      new_arr[randomIndex], new_arr[currentIndex]];
  }
  return new_arr;
}


function App() {
  const [cards, setCards] = useState<CardType[]>([]);

  const gameInit = () => {
    let shuffled = shuffle(cardValues);
    let finalCards: CardType[] = shuffled.map((card, index) => ({
      key: index,
      value: card,
      isFlipped: false,
      isMatched: false
    }));
    setCards(finalCards);
  };
  

  useEffect(() => {
    gameInit();
    const stored = Number(localStorage.getItem("highScore")) || 0;
    setHighScore(stored);
  }, []);


  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [canFlip, setCanFlip] = useState<boolean>(true);
  const [highScore, setHighScore] = useState<number>(0);
  flippedCards;
  

const checkWin = (pair: CardType[]) => {
  if (pair[0].value === pair[1].value) {
    setCards(prevCards =>
      prevCards.map(c =>
        c.value === pair[0].value
          ? { ...c, isMatched: true }
          : c
      )
    );

    setGameScore(prevScore => {
      const newScore = prevScore + 1;

      if (newScore === cardValues.length/2) {
        setTimeout(() => {
          if (newScore > highScore) {
            localStorage.setItem("highScore", newScore.toString());
            setHighScore(newScore);
            alert(`You won with a new High Score: ${newScore} points in ${movesCount+1} moves!\nStarting new game.`);
          }
          else{
          alert(`You won in ${movesCount+1} moves!\nStarting new game.`);
          }
          gameInit();
          setGameScore(0);
          setMovesCount(0);
        }, 500);
      }

      return newScore;
    });

  } else {
    setCards(prevCards =>
      prevCards.map(c =>
        c.isMatched ? c : { ...c, isFlipped: false }
      )
    );
  }
};


const flipCard = (card: CardType) => {
  if (!canFlip) return;
  if (card.isFlipped || card.isMatched) return;
  setCards(prevCards =>
    prevCards.map(c =>
      c.key === card.key ? { ...c, isFlipped: true } : c
    )
  );

  setFlippedCards(prev => {
    const next = [...prev, card];

    if (next.length === 2) {
      setCanFlip(false);
      setMovesCount(prev => prev + 1);
      setTimeout(() => {checkWin(next);setCanFlip(true);}, 1111);
      
      return [];
    }

    return next;
  });
};


  return (
    <div className="app">
      <GameHeader score={gameScore} moves={movesCount}/>
      <HighScore score={highScore}/>
      <div className="cards-grid">
        {cards.map((iCard) => (
          <Card cardData={iCard} clickFunc={flipCard}/>
          )
        )}
      </div>
    </div>
  );
}

export default App;
