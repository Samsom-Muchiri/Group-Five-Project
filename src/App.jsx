import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Main from "./components/Main";
import { Contexts } from "./context/Contexts";

function App() {
  return (
    <>
      <Contexts>
        {" "}
        <Main />
      </Contexts>
    </>
  );
}

export default App;
