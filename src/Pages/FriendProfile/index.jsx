import React, { useEffect, useState } from "react";

import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendProfileCard from "../../Components/FriendProfileCard/Profile";

const FriendProfile = () => {

    return (
        <>
            <Header />
            <FriendProfileCard />
            {/* <GetInTouch /> */}
            <Footer />
        </>
    );
};

export default FriendProfile;
