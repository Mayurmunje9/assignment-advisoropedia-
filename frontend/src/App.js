import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import { useSelector,useDispatch } from "react-redux";
import Spinner from "./components/Spinner";
import store from "./Redux/store";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPass from "./pages/ResetPass";
function App() {
 
  return (
    <Provider store={store}>
     
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/forgotPass"
              element={
                <PublicRoute>
                  <ForgotPassPage />
                </PublicRoute>
              }
            />
            <Route path="/reset-password/:token" element={<ResetPass />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/verify/:token"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
          
    </Provider>
  );
}

export default App;
