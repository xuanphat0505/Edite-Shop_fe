import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Navigation from "./components/Navigation/Navigation";
import Question from "./pages/Question/Question";
import Shop from "./pages/Shop/Shop";
import ToolBar from "./components/ToolBar/ToolBar";
import Form from "./shared/Form/Form";
import WishList from "./pages/WishList/WishList";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar/SideBar";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Compare from "./pages/Compare/Compare";
import QuickShop from "./components/QuickShop/QuickShop";
import CompareBox from "./components/CompareBox/CompareBox";
import SearchBlogResult from "./pages/SearchBlogResult/SearchBlogResult";
import SearchProductResult from "./pages/SearchProductResult/SearchProductResult";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import QuestionForm from "./components/QuestionForm/QuestionForm";
import ViewCart from "./pages/ViewCart/ViewCart";
import CheckOut from "./pages/CheckOut/CheckOut";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";
import PaymentMethod from "./pages/PaymentMethod/PaymentMethod";
import ListOrders from "./pages/ListOrders/ListOrders";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/compare" element={<Compare />}></Route>
        <Route path="/question" element={<Question />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/wishlist" element={<WishList />}></Route>
        <Route path="/blog/:id" element={<BlogDetail />}></Route>
        <Route path="/blog/result" element={<SearchBlogResult />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/product/result" element={<SearchProductResult />}></Route>
        <Route path="/view-cart" element={<ViewCart />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route
          path="/payment-status/result"
          element={<PaymentStatus />}
        ></Route>
        <Route path="/payment-method" element={<PaymentMethod />}></Route>
        <Route path="/orders" element={<ListOrders />}></Route>
      </Routes>
      <ToastContainer />
      <Footer />
      <Form />
      <Navigation />
      <Cart />
      <ToolBar />
      <Search />
      <SideBar />
      <QuickShop />
      <CompareBox />
      <QuestionForm />
    </div>
  );
}

export default App;
