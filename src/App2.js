import TeamList from "./components2/TeamList";
import "./App.scss";
// import img from "./assets/img/rotate.jpg";
function App2() {
  return (
    <>
      <div className="App">
        <TeamList />
      </div>
      {/* <div className="landscape-notice">
        <div className="landscape-notice-text">
          Please rotate your device to landscape mode to view the content.
        </div>
        <img className="landscape-notice-img" src={img} alt="" />
      </div> */}
    </>
  );
}

export default App2;
