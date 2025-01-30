import React, { useEffect, useState } from "react";
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import FriendRequests from "../../Components/FriendRequest/FriendRequests";

const FriendRequest = () => {
    const user = localStorage.getItem("user");
    const parseUserData = JSON.parse(user);
    return (
        <>
            <FriendRequests />
            {!parseUserData && <GetInTouch />}
        </>
    );
};

export default FriendRequest;