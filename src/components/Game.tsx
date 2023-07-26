import { useState, useRef } from "react";
type GameProps = {
  verifyLetter: (letter:string) => void
  pickedWord: string;
  pickedCategory: string;
  letters: string[];
  guessedLetters: string[];
  wrongLetters: string[];
  guesses: number;
  score: number;
}

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}:GameProps) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement | null>(null);


  const handleLetter = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLetter(event.target.value);

  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current?.focus();
  };


  return (
    <div className="game">
      <p>
        <span className="font-bold ">Pontuação: { score }</span>
      </p>
      <h1 className="text-[2.5rem] text-j-yellow">Adivinha a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span className=" text-j-yellow text-xl ">{ pickedCategory }</span>
      </h3>
      <p>Você ainda tem { guesses } tentativas</p>
      <div className="wordContainer flex items-center justify-center m-6 p-6 border-[10px] ">
        { letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className=" border-2 border-[#232323] pt-3 bg-white text-dark-gray font-bold text-7xl uppercase h-[6.25rem] w-[6.25rem] " key={ i }>
              { letter }
            </span>
          ) : (
              <span key={ i } className=" border-2 border-[#232323] pt-3 bg-white text-dark-gray font-bold text-7xl uppercase h-[6.25rem] w-[6.25rem] "></span>
          )
        ) }
      </div>
      <div>
        <p className="mb-5">Tente adivinhar a letra da palavra:</p>
        <form onSubmit={ handleSubmit } className=" flex items-center justify-center ">
          <input
            type="text"
            name="letter"
            maxLength={1}
            required onChange={ handleLetter }
            value={ letter }
            ref={ letterInputRef }
            className="h-12 w-12 text-3xl text-center mr-4 text-black "
          />
          <button className="bg-j-blue text-lg px-[2.81rem] border-2 rounded-[5rem]  uppercase font-bold cursor-pointer transition-[0.4s]" >Jogar</button>
        </form>
      </div>
      <div className="mt-4">
        <p>Letras já utilizadas</p>
        { wrongLetters.map((letter, index) => (
          <span key={ index }>{ letter },</span>
        )) }

      </div>
    </div>
  );
};
export default Game;