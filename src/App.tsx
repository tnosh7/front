import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  COM_PATH,
  GAME_PATH,
  MAIN_PATH,
  NEWS_PATH,
  STORE_PATH,
} from "./constants";
import Container from "./layouts/Container";
import { Community, Game, Main, News, Store } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={NEWS_PATH()} element={<News />} />
          <Route path={GAME_PATH()} element={<Game />} />
          <Route path={COM_PATH()} element={<Community />} />
          <Route path={STORE_PATH()} element={<Store />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
