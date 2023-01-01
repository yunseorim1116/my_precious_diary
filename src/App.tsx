import MainPage from "./views/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, AddDiary, DiaryList, DiaryDetail } from "./router/routerPath";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import DiaryListPage from "./views/DiaryListPage";
import AddDiaryPage from "./views/AddDiaryPage";
import DiaryDetailPage from "./views/DiaryDetailPage";
function App() {
  const GlobalStyle = createGlobalStyle`
  ${reset}
`;
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path={Home} element={<MainPage />} />
          <Route path={AddDiary} element={<AddDiaryPage />} />
          <Route path={DiaryList} element={<DiaryListPage />} />
          <Route path={`${DiaryDetail}:id`} element={<DiaryDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
