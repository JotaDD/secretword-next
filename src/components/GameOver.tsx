type GameOverProps = {
  tryAgain: ()=> void;
  score: number;
}

const GameOver = ({ tryAgain, score }:GameOverProps) => {
  return (
    <div className="end">
      <h1 className=" my-5 text-5xl">Fim de Jogo</h1>
      <h2 className="text-3xl">
        A sua pontuação foi: <span>{ score }</span>
      </h2>
      <button className="mt-5 bg-j-blue-[2.81rem] border-2 rounded-[5rem]  uppercase font-bold cursor-pointer transition-[0.4s] px-5" onClick={ tryAgain }>TENTAR NOVAMENTE</button>
    </div>

  );
};

export default GameOver;