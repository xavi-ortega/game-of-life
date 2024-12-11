import { useState } from "react";
import { Board } from "./components/Board";
import { Controls } from "./components/Controls";
import { GameControllerProvider } from "./providers/GameControllerProvider";
import { ToastContainer } from "react-toastify";
import { GuideModal } from "./components/GuideModal";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [openGuide, setOpenGuide] = useState(false);

  return (
    <>
      {openGuide ? <GuideModal onClose={() => setOpenGuide(false)} /> : null}

      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />

      <GameControllerProvider>
        <main>
          <Controls />

          <h1>
            Game of Life
            <button
              onClick={() => {
                setOpenGuide(true);
              }}
            >
              i
            </button>
          </h1>

          <Board />
        </main>
      </GameControllerProvider>
    </>
  );
};

export default App;
