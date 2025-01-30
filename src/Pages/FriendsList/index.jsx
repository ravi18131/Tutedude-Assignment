import React, { useEffect, useState } from "react";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendsList from "../../Components/FriendList/FriendsList";

const FriendRequest = () => {
    const user = localStorage.getItem("user");
    const parseUserData = JSON.parse(user);
    return (
        <>
            <FriendsList />
            {!parseUserData && <GetInTouch />}
        </>
    );
};

export default FriendRequest;