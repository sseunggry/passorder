import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "pages/home";
import "styles/base/index.scss";
import "styles/common.scss";
import "styles/style.scss";
import Cart from "./pages/cart";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
