const ResultGame = ({ resultGame }) => {
  const { who, status, point } = resultGame;
  return (
    <div>
      <h1>The Winner is : {who}</h1>
      <h3>
        Score : {point} ({status})
      </h3>
    </div>
  );
};

export default ResultGame;
