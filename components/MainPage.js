const MainPage = ({ handleChange, _Play }) => {
  return (
    <form onSubmit={e => _Play(e)}>
      <input name="username" type="text" onChange={handleChange} />
      <button type="submit">play</button>
    </form>
  );
};

export default MainPage;
