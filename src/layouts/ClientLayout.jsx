import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "../App.css";

import { MyContext } from "../App";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ClietLayout() {
  const location = useLocation();

  const noHeaderPaths = ["/signIn", "/signUp", "/forgot-password"];
  const noFooterPaths = ["/signIn", "/signUp", "/forgot-password"];

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDeliveryRoute = location.pathname.startsWith("/delhivery");

  const showHeader =
    !isAdminRoute &&
    !isDeliveryRoute &&
    !noHeaderPaths.some((path) => location.pathname.startsWith(path));

  const showFooter =
    !isAdminRoute &&
    !isDeliveryRoute &&
    !noFooterPaths.some((path) => location.pathname.startsWith(path));

  const [isLogin, setIsLogin] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setsubCategoryData] = useState([]);
  const [addingInCart, setAddingInCart] = useState(false);

  const [cartData, setCartData] = useState();
  const [searchData, setSearchData] = useState([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);

      const userData = JSON.parse(localStorage.getItem("user"));

      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);


  const values = {
    isLogin,
    setIsLogin,
    categoryData,
    setCategoryData,
    subCategoryData,
    setsubCategoryData,
    openProductDetailsModal,
    alertBox,
    setAlertBox,
    addToCart,
    addingInCart,
    setAddingInCart,
    cartData,
    setCartData,
    getCartData,
    searchData,
    setSearchData,
    windowWidth,
    isOpenNav,
    setIsOpenNav,
  };
  return (
    <>
      <MyContext.Provider value={values}>
        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
          className="snackbar"
        >
          <Alert
            onClose={handleClose}
            autoHideDuration={6000}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>

        {showHeader && <Header />}
        <Outlet></Outlet>
        {showFooter && <Footer />}
      </MyContext.Provider>
    </>
  );
}
