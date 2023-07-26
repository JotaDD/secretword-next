import Image from 'next/image'
import { Montserrat } from 'next/font/google';

//Styles

//React
import { useState, useCallback, useEffect } from "react";

//data
import { wordsList } from './api/data';

// Components
import StartScreen from '@/components/StartScreen';
import Game from '@/components/Game';
import GameOver from '@/components/GameOver';
import { log } from 'console';


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 5

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [gameStage, setGameStage] = useState<string>(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(guessesQty);
  const [score, setScore] = useState<number>(0);


  const pickedWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    return { word, category };
  }, [words]);


  // starts the secret word game 
  const startGame = useCallback(() => {
    //clear all letters 
    clearLetterStates();
    // pick word and pick category
    const { word, category } = pickedWordAndCategory();

    // array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter:string) => letter.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  // process the letter input
  const verifyLetter = (letter:string) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been used
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters => [
        ...actualGuessedLetters,
        normalizedLetter
      ]));

    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //check if you're out of guesses
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check win condition
  useEffect(() => {
    console.log(letters);
    const uniqueLetters = [...letters];

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => actualScore += 100);

      // restart game with new word
      startGame();
    }


  }, [guessedLetters, letters, startGame, gameStage]);

  // restarts the game
  const tryAgain = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }

  return (
    <div className={`flex justify-center items-center text-center ${ montserrat.className}`}>
      { gameStage === "start" && <StartScreen startGame={ startGame } /> }
      { gameStage === "game" &&
        <Game
          verifyLetter={ verifyLetter }
          pickedWord={ pickedWord }
          pickedCategory={ pickedCategory }
          letters={ letters }
          guessedLetters={ guessedLetters }
          wrongLetters={ wrongLetters }
          guesses={ guesses }
          score={ score }
        />
      }
      { gameStage === "end" && <GameOver tryAgain={ tryAgain } score={ score } /> }
    </div>
  );
}
