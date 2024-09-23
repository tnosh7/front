import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AUTH_PATH,
  COM_PATH,
  GAME_PATH,
  MAIN_PATH,
  NEWS_PATH,
  STORE_PATH
} from "./constants";
import Container from "./layouts/Container";
import { Auth, Community, Game, Main, News, Store } from "./pages";
import { useLoginUserStore } from "./stores";

function App() {

    // state: 로그인 유저 전역 상태 //
    const { setLoginUser, resetLoginUser } = useLoginUserStore();

    // state: cookie 상태 //
    const [cookies, setCookies] = useCookies();
  
    // function: get sign in user response 처리 함수 //
    const getLoginUserResponse = (responseBody) => {
      if (!responseBody) return;
      const loginUser = { ...(responseBody) };
      setLoginUser(loginUser);
    };
  
    // effect: accessToken cookie 값이 변경될 때 마다 실행할 함수 //
    useEffect(() => {
      if (!cookies.accessToken) {
        resetLoginUser();
        return;
      }
      getSignInUserRequest(cookies.accessToken).then(getLoginUserResponse);
    }, [cookies.accessToken]);
  return (
    <div className="App">
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={NEWS_PATH()} element={<News />} />
          <Route path={GAME_PATH()} element={<Game />} />
          <Route path={COM_PATH()} element={<Community />} />
          <Route path={STORE_PATH()} element={<Store />} />
          <Route path={AUTH_PATH()} element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
