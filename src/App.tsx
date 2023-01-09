import MainPage from "./views/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, AddDiary, DiaryList, DiaryDetail } from "./router/routerPath";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import DiaryListPage from "./views/DiaryListPage";
import AddDiaryPage from "./views/AddDiaryPage";
import DiaryDetailPage from "./views/DiaryDetailPage";
import Canvas from "./Canvas";
import { useEffect, useRef, useState } from "react";
import "./font.css";
function App() {
  const GlobalStyle = createGlobalStyle`
  body {background-color: #bfcbdc;}
  html {
    ::-webkit-scrollbar { display :none;}
  }
  ${reset}
`;

  return (
    <div className="App">
      <GlobalStyle />
      <div style={{ zIndex: "1", position: "relative" }}>
        <BrowserRouter>
          <Routes>
            <Route path={Home} element={<MainPage />} />
            <Route path={AddDiary} element={<AddDiaryPage />} />
            <Route path={DiaryList} element={<DiaryListPage />} />
            <Route path={`${DiaryDetail}:id`} element={<DiaryDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
