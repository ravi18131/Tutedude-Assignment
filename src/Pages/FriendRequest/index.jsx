import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendRequests from "../../Components/FriendRequest/FriendRequests";

const FriendRequest = () => {
    const user = localStorage.getItem("user");
    const parseUserData = JSON.parse(user);
    return (
        <>
            <Header />
            <FriendRequests />
            {!parseUserData && <GetInTouch />}
            <Footer />
        </>
    );
};

export default FriendRequest;