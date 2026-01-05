import { useEffect, useState } from 'react';
import { Card } from './components/card';
import { GameHeader } from './components/gameHeader';
import type { CardType } from './types/cardType';

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

  useEffect(() => {gameInit()}, [])

  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [canFlip, setCanFlip] = useState<boolean>(true);


const checkWin = (pair: CardType[]) => {
  if (pair[0].value === pair[1].value) {
    setCards(prevCards =>
      prevCards.map(c =>
        c.value === pair[0].value
          ? { ...c, isMatched: true }
          : c
      )
    );
    setGameScore(prev => prev + 1);
    console.log(gameScore+1, cardValues.length);
    if (gameScore + 2 === cardValues.length) {
      setTimeout(() => {alert(`You won in ${movesCount+1} moves! Starting new game.`);gameInit();setGameScore(0);setMovesCount(0);}, 500);
    }
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
  setMovesCount(prev => prev + 1);
  setCards(prevCards =>
    prevCards.map(c =>
      c.key === card.key ? { ...c, isFlipped: true } : c
    )
  );

  setFlippedCards(prev => {
    const next = [...prev, card];

    if (next.length === 2) {
      setCanFlip(false);
      setTimeout(() => {checkWin(next);setCanFlip(true);}, 1111);
      
      return [];
    }

    return next;
  });
};


  return (
    <div className="app">
      <GameHeader score={gameScore} moves={movesCount}/>
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
