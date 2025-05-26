import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Book from "./book/Book";
import Signup from "./pages/main/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import CategoryPage from "./pages/main/CategoryPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin"
import About from "./pages/main/About";
import Contact from "./pages/main/Contact"
import CreateBook from "./pages/admin/CreateBook";
import DeleteBook from "./pages/admin/DeleteBook";
import EditBook from "./pages/admin/EditBook";
import ShowBook from "./pages/admin/ShowBook";
import AdminMessages from "./pages/admin/AdminMessages.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import CartPage from "./pages/main/CartPage.jsx";
import CheckoutPage from "./pages/main/CheckoutPage";
import OrdersPage from "./pages/main/OrdersPage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={authUser ? <Book /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:categoryName" element={<CategoryPage/>} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/admin/CreateBook" element={<CreateBook/>} />
          <Route path="/admin/DeleteBook/:id" element={<DeleteBook />} />
          <Route path="/admin/EditBook/:id" element={<EditBook />} />
          <Route path="/admin/ShowBook/:id" element={<ShowBook />} />
          <Route path="/admin/messages" element={<AdminMessages/>} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/orders" element={<OrdersPage/>} />
          <Route path="/admin/orders" element={<AdminOrdersPage type="Pending" />} />
          <Route path="/admin/orders/shipped" element={<AdminOrdersPage type="Shipped" />} />
          <Route path="/admin/orders/delivered" element={<AdminOrdersPage type="Delivered" />} />


        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
