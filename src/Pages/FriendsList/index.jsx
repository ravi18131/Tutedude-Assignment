import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendsList from "../../Components/FriendList/FriendsList";

const FriendRequest = () => {
    const user = localStorage.getItem("user");
    const parseUserData = JSON.parse(user);
    return (
        <>
            <Header />
            <FriendsList />
            {!parseUserData && <GetInTouch />}
            <Footer />
        </>
    );
};

export default FriendRequest;