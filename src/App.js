import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "pages/home";
import "styles/base/index.scss";
import "styles/common.scss";
import "styles/style.scss";
import Cart from "pages/cart";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Order from "./pages/order";
import Qr from "./pages/qr";
import MyPage from "./pages/mypage";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/qr" element={<Qr />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
