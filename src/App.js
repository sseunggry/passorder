import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "styles/common.scss";
import "styles/style.scss";
import Home from "pages/home";
import Cart from "pages/cart";
import Order from "pages/order";
import Qr from "pages/qr";
import MyPage from "pages/mypage";
import SearchPage from "pages/search";
import DetailPage from "pages/sub/Detail";
import TogetherOrder from "pages/together";
import MenuSelect from "pages/sub/MenuSelect";
import EventPage from "pages/sub/Event";
import StoreInfo from "pages/sub/StoreInfo";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/qr" element={<Qr />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/store/:id" element={<DetailPage />} />
                  <Route path="/store/:id/menu/:categoryId/:productId" element={<MenuSelect />} />
                  <Route path="/store/:id/info" element={<StoreInfo />} />
                  <Route path="/event/" element={<EventPage />} />
                  <Route path="/event/:id" element={<DetailPage />} />
                  <Route path="/together/:id" element={<TogetherOrder />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
