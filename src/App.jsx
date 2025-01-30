import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./context/SnackbarProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// user
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Home";

// Auth
import Verified from "./Pages/Auth/Verified/index";
import ExpiredVerifition from "./Pages/Auth/VerificationExpired/index";
import AlreadyVerified from "./Pages/Auth/AlreadyVrified/index";
import ForgotPassword from "./Pages/Auth/ForgotPassword/index";
import ForgotPasswordConfirm from "./Pages/Auth/ConfirmForgotPassword/index";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          {/* AUTH */}
          <Route path="/auth/verified" exact={true} element={<Verified />} />
          <Route
            path="/auth/expired/link"
            exact={true}
            element={<ExpiredVerifition />}
          />
          <Route
            path="/auth/alreadyverified"
            exact={true}
            element={<AlreadyVerified />}
          />
          <Route
            path="/forgot-password"
            exact={true}
            element={<ForgotPassword />}
          />
          <Route
            path="/forgot-password/:userId/:uniqueString"
            exact={true}
            element={<ForgotPasswordConfirm />}
          />

          <Route path="/signIn" exact={true} element={<SignIn />} />
          <Route path="/signUp" exact={true} element={<SignUp />} />

          {/* user */}

          <Route path="/" exact={true} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App;