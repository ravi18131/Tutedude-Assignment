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
import MyAccount from "./Components/MyAccount/index";
import FriendProfile from "./Pages/FriendProfile/index";
import FriendRequests from "./Pages/FriendRequest/index";
import FriendsList from "./Pages/FriendsList/index";
import ClietLayout from "./layouts/ClientLayout";
import ChangePassword from "./Components/MyAccount/change-password/index";
import DisplayData from "./Components/showdata/index"
import PrivacyPolicyPage from "./Pages/Legal/PrivacyPolicy";
import TermsAndConditionPage from "./Pages/Legal/TermsAndConditions";
import ContactUs from "./Pages/ContactUs/ContactUs";
function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />

          <Route path="" element={<ClietLayout></ClietLayout>}>
            {/* AUTH */}
            <Route path="/auth/verified" exact={true} element={<Verified />} />
            <Route path="/auth/expired/link" exact={true} element={<ExpiredVerifition />} />
            <Route path="/auth/alreadyverified" exact={true} element={<AlreadyVerified />} />
            <Route path="/forgot-password" exact={true} element={<ForgotPassword />} />
            <Route path="/forgot-password/:userId/:uniqueString" exact={true} element={<ForgotPasswordConfirm />} />
            <Route path="/signIn" exact={true} element={<SignIn />} />
            <Route path="/signUp" exact={true} element={<SignUp />} />
            <Route path="/user/:username" exact={true} element={<FriendProfile />} />
            <Route path="/my-account" exact={true} element={<MyAccount />} />
            <Route path="/friend-requests" exact={true} element={<FriendRequests />} />
            <Route path="/friends" exact={true} element={<FriendsList />} />
            <Route path="/user/change-password" exact={true} element={<ChangePassword />} />
            <Route path="/privacy-policy" exact={true} element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-condition" exact={true} element={<TermsAndConditionPage />} />
            <Route path="/contact-us" exact={true} element={<ContactUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App;