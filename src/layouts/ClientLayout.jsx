import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";

import "../App.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export const MyContext = createContext(); // Export the context to be used in child components

export default function ClientLayout() {
  const [userData, setUserData] = useState(null); // Example state to pass into context

  // Example: Fetching data to set the userData (this can be any other logic)
  useEffect(() => {
    // Simulating fetching data for user
    const fetchUserData = async () => {
      const data = await fetch("/api/user"); // Replace with actual API call
      const result = await data.json();
      setUserData(result);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <MyContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Outlet />
        <Footer />
      </MyContext.Provider>
    </>
  );
}
