type StartScreenProps = {
  startGame: ()=> void
}

const StartScreen = ({ startGame }:StartScreenProps) => {
  return (
    <div className="start">
      <h1 className=" my-5 text-5xl">Adivinhe a Palavra!</h1>
      <p className="text-md my-3">Clique no botão abaixo para começar a jogar</p>
      <button className="bg-j-blue text-lg px-[2.81rem] border-2 rounded-[5rem]  uppercase font-bold cursor-pointer transition-[0.4s]"  onClick={ startGame }>Começar o jogo</button>
    </div>
  );
};

export default StartScreen;