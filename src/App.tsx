import MainPage from "./views/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./router/routerPath";
function App() {
  return (
    <div className="App">
      <div>gd</div>

      <BrowserRouter>
        <Routes>
          <Route path={Home} element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
